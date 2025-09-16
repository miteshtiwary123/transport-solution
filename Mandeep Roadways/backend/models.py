from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Consignor(Base):
    __tablename__ = "consignors"
    id = Column(Integer, primary_key=True, index=True)
    consignor_name = Column(String, nullable=False)
    gst_number = Column(String, nullable=False)
    phone_number = Column(String)
    alternate_number = Column(String)
    place = Column(String)

class Consignee(Base):
    __tablename__ = "consignees"
    id = Column(Integer, primary_key=True, index=True)
    consignee_name = Column(String, nullable=False)
    gst_number = Column(String, nullable=False)
    phone_number = Column(String)
    alternate_number = Column(String)
    place = Column(String)

class Account(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    account_number = Column(String, nullable=False)
    ifsc_code = Column(String, nullable=False)
    trucks = relationship("Truck", back_populates="account")  # One-to-many relationship

class Truck(Base):
    __tablename__ = "trucks"
    id = Column(Integer, primary_key=True, index=True)
    truck_number = Column(String, nullable=False)
    weight = Column(String)
    truck_rc = Column(String)  # Will store file path
    driver_licence = Column(String)  # Will store file path
    driver_mobile = Column(String)
    owner_mobile = Column(String)
    owner_aadhar_card = Column(String)  # Will store file path
    owner_pan_card = Column(String)  # Will store file path
    account_number = Column(String)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=True)  # Foreign key to Account
    account = relationship("Account", back_populates="trucks")  # Relationship to Account

class Agent(Base):
    __tablename__ = "agents"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    mobile = Column(String)
    address = Column(String)