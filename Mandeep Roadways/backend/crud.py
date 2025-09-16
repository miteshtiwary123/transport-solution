from sqlalchemy.orm import Session
from models import Consignor, Consignee, Truck, Agent, Account
from schemas import ConsignorCreate, ConsigneeCreate, TruckCreate, AgentCreate, AccountCreate
import os

# Consignor CRUD (unchanged)
def create_consignor(db: Session, consignor: ConsignorCreate):
    db_consignor = Consignor(**consignor.dict())
    db.add(db_consignor)
    db.commit()
    db.refresh(db_consignor)
    return db_consignor

def get_consignor(db: Session, consignor_id: int):
    return db.query(Consignor).filter(Consignor.id == consignor_id).first()

def get_consignors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Consignor).offset(skip).limit(limit).all()

def update_consignor(db: Session, consignor_id: int, consignor: ConsignorCreate):
    db_consignor = db.query(Consignor).filter(Consignor.id == consignor_id).first()
    if db_consignor:
        for key, value in consignor.dict().items():
            setattr(db_consignor, key, value)
        db.commit()
        db.refresh(db_consignor)
    return db_consignor

def delete_consignor(db: Session, consignor_id: int):
    db_consignor = db.query(Consignor).filter(Consignor.id == consignor_id).first()
    if db_consignor:
        db.delete(db_consignor)
        db.commit()
    return db_consignor

# Consignee CRUD (unchanged)
def create_consignee(db: Session, consignee: ConsigneeCreate):
    db_consignee = Consignee(**consignee.dict())
    db.add(db_consignee)
    db.commit()
    db.refresh(db_consignee)
    return db_consignee

def get_consignee(db: Session, consignee_id: int):
    return db.query(Consignee).filter(Consignee.id == consignee_id).first()

def get_consignees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Consignee).offset(skip).limit(limit).all()

def update_consignee(db: Session, consignee_id: int, consignee: ConsigneeCreate):
    db_consignee = db.query(Consignee).filter(Consignee.id == consignee_id).first()
    if db_consignee:
        for key, value in consignee.dict().items():
            setattr(db_consignee, key, value)
        db.commit()
        db.refresh(db_consignee)
    return db_consignee

def delete_consignee(db: Session, consignee_id: int):
    db_consignee = db.query(Consignee).filter(Consignee.id == consignee_id).first()
    if db_consignee:
        db.delete(db_consignee)
        db.commit()
    return db_consignee

# Account CRUD
def create_account(db: Session, account: AccountCreate):
    db_account = Account(**account.dict())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

def get_account(db: Session, account_id: int):
    return db.query(Account).filter(Account.id == account_id).first()

def get_accounts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Account).offset(skip).limit(limit).all()

def update_account(db: Session, account_id: int, account: AccountCreate):
    db_account = db.query(Account).filter(Account.id == account_id).first()
    if db_account:
        for key, value in account.dict().items():
            setattr(db_account, key, value)
        db.commit()
        db.refresh(db_account)
    return db_account

def delete_account(db: Session, account_id: int):
    db_account = db.query(Account).filter(Account.id == account_id).first()
    if db_account:
        db.delete(db_account)
        db.commit()
    return db_account

# Truck CRUD
def create_truck(db: Session, truck: TruckCreate, file_paths: dict):
    db_truck = Truck(**truck.dict())
    if "truck_rc" in file_paths:
        db_truck.truck_rc = file_paths["truck_rc"]
    if "driver_licence" in file_paths:
        db_truck.driver_licence = file_paths["driver_licence"]
    if "owner_aadhar_card" in file_paths:
        db_truck.owner_aadhar_card = file_paths["owner_aadhar_card"]
    if "owner_pan_card" in file_paths:
        db_truck.owner_pan_card = file_paths["owner_pan_card"]
    db.add(db_truck)
    db.commit()
    db.refresh(db_truck)
    return db_truck

def get_truck(db: Session, truck_id: int):
    return db.query(Truck).filter(Truck.id == truck_id).first()

def get_trucks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Truck).offset(skip).limit(limit).all()

def update_truck(db: Session, truck_id: int, truck: TruckCreate, file_paths: dict):
    db_truck = db.query(Truck).filter(Truck.id == truck_id).first()
    if db_truck:
        for key, value in truck.dict().items():
            setattr(db_truck, key, value)
        if "truck_rc" in file_paths:
            db_truck.truck_rc = file_paths["truck_rc"]
        if "driver_licence" in file_paths:
            db_truck.driver_licence = file_paths["driver_licence"]
        if "owner_aadhar_card" in file_paths:
            db_truck.owner_aadhar_card = file_paths["owner_aadhar_card"]
        if "owner_pan_card" in file_paths:
            db_truck.owner_pan_card = file_paths["owner_pan_card"]
        db.commit()
        db.refresh(db_truck)
    return db_truck

def delete_truck(db: Session, truck_id: int):
    db_truck = db.query(Truck).filter(Truck.id == truck_id).first()
    if db_truck:
        for file_field in ['truck_rc', 'driver_licence', 'owner_aadhar_card', 'owner_pan_card']:
            file_path = getattr(db_truck, file_field)
            if file_path and os.path.exists(file_path):
                os.remove(file_path)
        db.delete(db_truck)
        db.commit()
    return db_truck

# Agent CRUD (unchanged)
def create_agent(db: Session, agent: AgentCreate):
    db_agent = Agent(**agent.dict())
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

def get_agent(db: Session, agent_id: int):
    return db.query(Agent).filter(Agent.id == agent_id).first()

def get_agents(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Agent).offset(skip).limit(limit).all()

def update_agent(db: Session, agent_id: int, agent: AgentCreate):
    db_agent = db.query(Agent).filter(Agent.id == agent_id).first()
    if db_agent:
        for key, value in agent.dict().items():
            setattr(db_agent, key, value)
        db.commit()
        db.refresh(db_agent)
    return db_agent

def delete_agent(db: Session, agent_id: int):
    db_agent = db.query(Agent).filter(Agent.id == agent_id).first()
    if db_agent:
        db.delete(db_agent)
        db.commit()
    return db_agent