from pydantic import BaseModel
from typing import Optional, List

class ConsignorBase(BaseModel):
    consignor_name: str
    gst_number: str
    phone_number: Optional[str] = None
    alternate_number: Optional[str] = None
    place: Optional[str] = None

class ConsignorCreate(ConsignorBase):
    pass

class Consignor(ConsignorBase):
    id: int
    class Config:
        orm_mode = True

class ConsigneeBase(BaseModel):
    consignee_name: str
    gst_number: str
    phone_number: Optional[str] = None
    alternate_number: Optional[str] = None
    place: Optional[str] = None

class ConsigneeCreate(ConsigneeBase):
    pass

class Consignee(ConsigneeBase):
    id: int
    class Config:
        orm_mode = True

class AccountBase(BaseModel):
    name: str
    account_number: str
    ifsc_code: str

class AccountCreate(AccountBase):
    pass

class Account(AccountBase):
    id: int
    class Config:
        orm_mode = True

class TruckBase(BaseModel):
    truck_number: str
    weight: Optional[str] = None
    driver_mobile: Optional[str] = None
    owner_mobile: Optional[str] = None
    account_id: Optional[int] = None  # Foreign key reference

class TruckCreate(TruckBase):
    pass

class Truck(TruckBase):
    id: int
    truck_rc: Optional[str] = None
    driver_licence: Optional[str] = None
    owner_aadhar_card: Optional[str] = None
    owner_pan_card: Optional[str] = None
    account: Optional[Account] = None  # Nested account details
    class Config:
        orm_mode = True

class AgentBase(BaseModel):
    name: Optional[str] = None
    mobile: Optional[str] = None
    address: Optional[str] = None

class AgentCreate(AgentBase):
    pass

class Agent(AgentBase):
    id: int
    class Config:
        orm_mode = True