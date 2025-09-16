from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import crud
import models
import schemas
from database import SessionLocal, engine
import os
import shutil

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIRECTORY = "./uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def save_file(file: UploadFile, prefix: str) -> str:
    file_extension = file.filename.split('.')[-1]
    file_path = f"{UPLOAD_DIRECTORY}/{prefix}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return file_path

# Consignor Endpoints (unchanged)
@app.post("/consignors/", response_model=schemas.Consignor)
def create_consignor(consignor: schemas.ConsignorCreate, db: Session = Depends(get_db)):
    return crud.create_consignor(db=db, consignor=consignor)

@app.get("/consignors/", response_model=List[schemas.Consignor])
def read_consignors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    consignors = crud.get_consignors(db, skip=skip, limit=limit)
    return consignors

@app.get("/consignors/{consignor_id}", response_model=schemas.Consignor)
def read_consignor(consignor_id: int, db: Session = Depends(get_db)):
    db_consignor = crud.get_consignor(db, consignor_id=consignor_id)
    if db_consignor is None:
        raise HTTPException(status_code=404, detail="Consignor not found")
    return db_consignor

@app.put("/consignors/{consignor_id}", response_model=schemas.Consignor)
def update_consignor(consignor_id: int, consignor: schemas.ConsignorCreate, db: Session = Depends(get_db)):
    db_consignor = crud.update_consignor(db, consignor_id=consignor_id, consignor=consignor)
    if db_consignor is None:
        raise HTTPException(status_code=404, detail="Consignor not found")
    return db_consignor

@app.delete("/consignors/{consignor_id}")
def delete_consignor(consignor_id: int, db: Session = Depends(get_db)):
    db_consignor = crud.delete_consignor(db, consignor_id=consignor_id)
    if db_consignor is None:
        raise HTTPException(status_code=404, detail="Consignor not found")
    return {"message": "Consignor deleted successfully"}

# Consignee Endpoints (unchanged)
@app.post("/consignees/", response_model=schemas.Consignee)
def create_consignee(consignee: schemas.ConsigneeCreate, db: Session = Depends(get_db)):
    return crud.create_consignee(db=db, consignee=consignee)

@app.get("/consignees/", response_model=List[schemas.Consignee])
def read_consignees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    consignees = crud.get_consignees(db, skip=skip, limit=limit)
    return consignees

@app.get("/consignees/{consignee_id}", response_model=schemas.Consignee)
def read_consignee(consignee_id: int, db: Session = Depends(get_db)):
    db_consignee = crud.get_consignee(db, consignee_id=consignee_id)
    if db_consignee is None:
        raise HTTPException(status_code=404, detail="Consignee not found")
    return db_consignee

@app.put("/consignees/{consignee_id}", response_model=schemas.Consignee)
def update_consignee(consignee_id: int, consignee: schemas.ConsigneeCreate, db: Session = Depends(get_db)):
    db_consignee = crud.update_consignee(db, consignee_id=consignee_id, consignee=consignee)
    if db_consignee is None:
        raise HTTPException(status_code=404, detail="Consignee not found")
    return db_consignee

@app.delete("/consignees/{consignee_id}")
def delete_consignee(consignee_id: int, db: Session = Depends(get_db)):
    db_consignee = crud.delete_consignee(db, consignee_id=consignee_id)
    if db_consignee is None:
        raise HTTPException(status_code=404, detail="Consignee not found")
    return {"message": "Consignee deleted successfully"}

# Account Endpoints
@app.post("/accounts/", response_model=schemas.Account)
def create_account(account: schemas.AccountCreate, db: Session = Depends(get_db)):
    return crud.create_account(db=db, account=account)

@app.get("/accounts/", response_model=List[schemas.Account])
def read_accounts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    accounts = crud.get_accounts(db, skip=skip, limit=limit)
    return accounts

@app.get("/accounts/{account_id}", response_model=schemas.Account)
def read_account(account_id: int, db: Session = Depends(get_db)):
    db_account = crud.get_account(db, account_id=account_id)
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return db_account

@app.put("/accounts/{account_id}", response_model=schemas.Account)
def update_account(account_id: int, account: schemas.AccountCreate, db: Session = Depends(get_db)):
    db_account = crud.update_account(db, account_id=account_id, account=account)
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return db_account

@app.delete("/accounts/{account_id}")
def delete_account(account_id: int, db: Session = Depends(get_db)):
    db_account = crud.delete_account(db, account_id=account_id)
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return {"message": "Account deleted successfully"}

# Truck Endpoints
@app.post("/trucks/", response_model=schemas.Truck)
async def create_truck(
    truck_number: str = Form(...),
    weight: Optional[str] = Form(None),
    driver_mobile: Optional[str] = Form(None),
    owner_mobile: Optional[str] = Form(None),
    account_id: Optional[int] = Form(None),
    truck_rc: Optional[UploadFile] = File(None),
    driver_licence: Optional[UploadFile] = File(None),
    owner_aadhar_card: Optional[UploadFile] = File(None),
    owner_pan_card: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    truck_data = schemas.TruckCreate(
        truck_number=truck_number,
        weight=weight,
        driver_mobile=driver_mobile,
        owner_mobile=owner_mobile,
        account_id=account_id
    )

    file_paths = {}
    if truck_rc:
        file_paths["truck_rc"] = await save_file(truck_rc, "truck_rc")
    if driver_licence:
        file_paths["driver_licence"] = await save_file(driver_licence, "driver_licence")
    if owner_aadhar_card:
        file_paths["owner_aadhar_card"] = await save_file(owner_aadhar_card, "owner_aadhar")
    if owner_pan_card:
        file_paths["owner_pan_card"] = await save_file(owner_pan_card, "owner_pan")

    return crud.create_truck(db=db, truck=truck_data, file_paths=file_paths)

@app.get("/trucks/", response_model=List[schemas.Truck])
def read_trucks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    trucks = crud.get_trucks(db, skip=skip, limit=limit)
    return trucks

@app.get("/trucks/{truck_id}", response_model=schemas.Truck)
def read_truck(truck_id: int, db: Session = Depends(get_db)):
    db_truck = crud.get_truck(db, truck_id=truck_id)
    if db_truck is None:
        raise HTTPException(status_code=404, detail="Truck not found")
    return db_truck

@app.put("/trucks/{truck_id}", response_model=schemas.Truck)
async def update_truck(
    truck_id: int,
    truck_number: str,
    weight: Optional[str] = None,
    driver_mobile: Optional[str] = None,
    owner_mobile: Optional[str] = None,
    account_id: Optional[int] = None,
    truck_rc: Optional[UploadFile] = File(None),
    driver_licence: Optional[UploadFile] = File(None),
    owner_aadhar_card: Optional[UploadFile] = File(None),
    owner_pan_card: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    truck_data = schemas.TruckCreate(
        truck_number=truck_number,
        weight=weight,
        driver_mobile=driver_mobile,
        owner_mobile=owner_mobile,
        account_id=account_id
    )

    file_paths = {}
    if truck_rc:
        file_paths["truck_rc"] = await save_file(truck_rc, "truck_rc")
    if driver_licence:
        file_paths["driver_licence"] = await save_file(driver_licence, "driver_licence")
    if owner_aadhar_card:
        file_paths["owner_aadhar_card"] = await save_file(owner_aadhar_card, "owner_aadhar")
    if owner_pan_card:
        file_paths["owner_pan_card"] = await save_file(owner_pan_card, "owner_pan")

    db_truck = crud.update_truck(db, truck_id=truck_id, truck=truck_data, file_paths=file_paths)
    if db_truck is None:
        raise HTTPException(status_code=404, detail="Truck not found")
    return db_truck

@app.delete("/trucks/{truck_id}")
def delete_truck(truck_id: int, db: Session = Depends(get_db)):
    db_truck = crud.delete_truck(db, truck_id=truck_id)
    if db_truck is None:
        raise HTTPException(status_code=404, detail="Truck not found")
    return {"message": "Truck deleted successfully"}

# Agent Endpoints (unchanged)
@app.post("/agents/", response_model=schemas.Agent)
def create_agent(agent: schemas.AgentCreate, db: Session = Depends(get_db)):
    return crud.create_agent(db=db, agent=agent)

@app.get("/agents/", response_model=List[schemas.Agent])
def read_agents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    agents = crud.get_agents(db, skip=skip, limit=limit)
    return agents

@app.get("/agents/{agent_id}", response_model=schemas.Agent)
def read_agent(agent_id: int, db: Session = Depends(get_db)):
    db_agent = crud.get_agent(db, agent_id=agent_id)
    if db_agent is None:
        raise HTTPException(status_code=404, detail="Agent not found")
    return db_agent

@app.put("/agents/{agent_id}", response_model=schemas.Agent)
def update_agent(agent_id: int, agent: schemas.AgentCreate, db: Session = Depends(get_db)):
    db_agent = crud.update_agent(db, agent_id=agent_id, agent=agent)
    if db_agent is None:
        raise HTTPException(status_code=404, detail="Agent not found")
    return db_agent

@app.delete("/agents/{agent_id}")
def delete_agent(agent_id: int, db: Session = Depends(get_db)):
    db_agent = crud.delete_agent(db, agent_id=agent_id)
    if db_agent is None:
        raise HTTPException(status_code=404, detail="Agent not found")
    return {"message": "Agent deleted successfully"}