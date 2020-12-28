# bamboo-gen-step
Bamboo yml generator for jobs steps.

## Method: Script Task

**Description:**
The Script task allows you to define a script to be run in bash on Linux, or command files on Windows.

**Parameters:**

* Environment - The environment to run the task on.
* Is Final task - If the task is a final task or not.
* Commands - The commands to run (one per line).

## Method: Clean Task

**Description:**
The Clean task cleans the working directory of the job. This task will remove all the files from the working directory when executed.

**Parameters:**

* Environment - The environment to run the task on.
* Is Final task - If the task is a final task or not.


## Method: Artifact Download Task

**Description:**
The Artifact Download task copies Bamboo shared artifacts to a specified folder. This task allows sharing artifacts between different build plans.

**Parameters:**

* Environment - The environment to run the task on.
* Is Final task - If the task is a final task or not.
* name - The name of the artifact
* destination - The destination to download the artifact to.


## Method: Test Parser Task

**Description:**
The Test Parser task in Bamboo parses test data. It may also run tests, using a particular testing framework.

**Parameters:**

* Environment - The environment to run the task on.
* Is Final task - If the task is a final task or not.
* Type - The type of the test (predefined options: JUnit, TestNG, Mocha, NUnit, MSTest)
* Test Results - the tests results files paths, otherwise uses the default location for each type (one per line)
