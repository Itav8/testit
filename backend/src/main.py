from fastapi import FastAPI
from db import Base, engine
import routers

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(routers.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
