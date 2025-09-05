from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from mangum import Mangum
import sqlglot


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    enable_cors: bool = False


settings = Settings()
app = FastAPI()


class TranspileRequest(BaseModel):
    sql: str = Field(..., max_length=5000)
    read: str
    write: str


if settings.enable_cors:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.exception_handler(sqlglot.ParseError)
def sqlglot_parse_error_handler(request: Request, exc: sqlglot.ParseError):
    return JSONResponse({"errors": exc.errors}, status_code=400)


@app.get("/api/version")
async def version():
    return {"version": "0.0.1"}


@app.post("/api/sql/transpile")
async def transpile(request: TranspileRequest):
    results = sqlglot.transpile(
        request.sql,
        read=request.read,
        write=request.write,
    )

    return {"results": results}


lambda_handler = Mangum(app, lifespan="off", api_gateway_base_path="/dev")
