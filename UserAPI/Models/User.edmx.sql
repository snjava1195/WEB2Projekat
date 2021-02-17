
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 02/01/2021 03:30:57
-- Generated from EDMX file: C:\Users\jovan\Desktop\jana\jana\WEB2\WEB2Projekat\UserAPI\Models\User.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [Angular];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[AirlineDetails]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AirlineDetails];
GO
IF OBJECT_ID(N'[dbo].[BranchOffices]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BranchOffices];
GO
IF OBJECT_ID(N'[dbo].[Cars]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Cars];
GO
IF OBJECT_ID(N'[dbo].[FlightReservations]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FlightReservations];
GO
IF OBJECT_ID(N'[dbo].[Flights]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Flights];
GO
IF OBJECT_ID(N'[dbo].[RentaCars]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RentaCars];
GO
IF OBJECT_ID(N'[dbo].[UserDetails]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserDetails];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'UserDetails'
CREATE TABLE [dbo].[UserDetails] (
    [UserId] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(50)  NOT NULL,
    [LastName] varchar(50)  NOT NULL,
    [Password] varchar(50)  NOT NULL,
    [ConfirmPassword] varchar(50)  NOT NULL,
    [Phone] varchar(50)  NOT NULL,
    [City] varchar(50)  NOT NULL,
    [Email] varchar(50)  NOT NULL,
    [UserType] int  NOT NULL
);
GO

-- Creating table 'Airlines'
CREATE TABLE [dbo].[Airlines] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Address] nvarchar(50)  NOT NULL,
    [Description] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'RentaCars'
CREATE TABLE [dbo].[RentaCars] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Address] nvarchar(50)  NOT NULL,
    [Description] nvarchar(50)  NOT NULL,
    [Rate] float  NOT NULL,
    [City] nvarchar(50)  NOT NULL,
    [RatedBy] int  NOT NULL
);
GO

-- Creating table 'BranchOffices'
CREATE TABLE [dbo].[BranchOffices] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RentaCarId] int  NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Address] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'Cars'
CREATE TABLE [dbo].[Cars] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RentaCarId] int  NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Rate] float  NOT NULL,
    [RatedBy] int  NOT NULL,
    [Price] float  NOT NULL,
    [Reserved] bit  NOT NULL
);
GO

-- Creating table 'AirlineDetails'
CREATE TABLE [dbo].[AirlineDetails] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Description] nvarchar(50)  NOT NULL,
    [Address] nvarchar(50)  NOT NULL,
    [AdminId] int  NOT NULL
);
GO

-- Creating table 'Flights'
CREATE TABLE [dbo].[Flights] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [DatumPoletanja] datetime  NOT NULL,
    [DatumSletanja] datetime  NOT NULL,
    [VremeTrajanjaLeta] nvarchar(50)  NOT NULL,
    [DuzinaPutovanja] bigint  NOT NULL,
    [BrojPresedanja] int  NOT NULL,
    [Cena] bigint  NOT NULL,
    [MestoPoletanja] nvarchar(50)  NOT NULL,
    [MestoSletanja] nvarchar(50)  NOT NULL,
    [OcenaLeta] int  NOT NULL,
    [IdAvioKompanije] int  NOT NULL
);
GO

-- Creating table 'FlightReservations'
CREATE TABLE [dbo].[FlightReservations] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] int  NOT NULL,
    [FlightId] int  NOT NULL
);
GO

-- Creating table 'Kartas'
CREATE TABLE [dbo].[Kartas] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [BrojLeta] int  NOT NULL,
    [Popust] bigint  NULL,
    [Cena] bigint  NULL
);
GO

-- Creating table 'Presedanjes'
CREATE TABLE [dbo].[Presedanjes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Lokacija] varchar(50)  NOT NULL,
    [IdLeta] int  NOT NULL
);
GO

-- Creating table 'FlightReservation1'
CREATE TABLE [dbo].[FlightReservation1] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] int  NOT NULL,
    [FlightId] int  NOT NULL
);
GO

-- Creating table 'AirlineDetail1'
CREATE TABLE [dbo].[AirlineDetail1] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Description] nvarchar(50)  NOT NULL,
    [Address] nvarchar(50)  NOT NULL,
    [AdminId] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [UserId] in table 'UserDetails'
ALTER TABLE [dbo].[UserDetails]
ADD CONSTRAINT [PK_UserDetails]
    PRIMARY KEY CLUSTERED ([UserId] ASC);
GO

-- Creating primary key on [Id] in table 'Airlines'
ALTER TABLE [dbo].[Airlines]
ADD CONSTRAINT [PK_Airlines]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'RentaCars'
ALTER TABLE [dbo].[RentaCars]
ADD CONSTRAINT [PK_RentaCars]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'BranchOffices'
ALTER TABLE [dbo].[BranchOffices]
ADD CONSTRAINT [PK_BranchOffices]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Cars'
ALTER TABLE [dbo].[Cars]
ADD CONSTRAINT [PK_Cars]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AirlineDetails'
ALTER TABLE [dbo].[AirlineDetails]
ADD CONSTRAINT [PK_AirlineDetails]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Flights'
ALTER TABLE [dbo].[Flights]
ADD CONSTRAINT [PK_Flights]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'FlightReservations'
ALTER TABLE [dbo].[FlightReservations]
ADD CONSTRAINT [PK_FlightReservations]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Kartas'
ALTER TABLE [dbo].[Kartas]
ADD CONSTRAINT [PK_Kartas]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Presedanjes'
ALTER TABLE [dbo].[Presedanjes]
ADD CONSTRAINT [PK_Presedanjes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'FlightReservation1'
ALTER TABLE [dbo].[FlightReservation1]
ADD CONSTRAINT [PK_FlightReservation1]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AirlineDetail1'
ALTER TABLE [dbo].[AirlineDetail1]
ADD CONSTRAINT [PK_AirlineDetail1]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------