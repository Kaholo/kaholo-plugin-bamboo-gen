# bamboo-gen-deployment
Bamboo yml generator for deployments and release namings.


## Method: Create Deployment

**Description:**

A deployment project in Bamboo is a container for holding the software project you are deploying: releases that have been built and tested, and the environments to which releases are deployed.

**Parameters:**

* Name - the name of the deployment project
* Source Plan


## Method: Create Release Naming

**Description:**

Define how releases should be named when they are created by Bamboo

**Parameters:**

* Next Version Name - the name of the next version.
* Applies To Branches - if the naming applies to the branches
* Auto Increment - If bamboo should auto increment a variable
* Auto Increment Variables - list of variables to increment (one per line)
