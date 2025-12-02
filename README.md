🚀 Salesforce Case Management App

<p align="center">
  <img src="https://img.shields.io/badge/Salesforce-Apex-blue?logo=salesforce&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Lightning-Web%20Components-00A1E0?style=for-the-badge&logo=salesforce"/>
  <img src="https://img.shields.io/badge/Flows-Automation-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/CI/CD-Enabled-success?style=for-the-badge&logo=github"/>
  <img src="https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Author-%20Chimeziri%20Anyanwu-orange?style=for-the-badge"/>
</p>

---


Apex • Lightning Web Components (LWC) • Flows • Queues • Dashboards

A full Salesforce Case Management Solution designed to demonstrate real enterprise Salesforce development skills, including Apex Trigger Patterns, LWC form components, automation with Flows, queue routing, and analytics dashboards.

This project is fully implemented and tested in a Salesforce Developer Org.

🌟 Features

🔹 1. Apex Case Assignment Engine

Automatically assigns cases to Tech Support or Billing Support queues

Applies Apex Handler Pattern for clean, scalable logic

Automatically sets SLA Due Date (+8 hours from creation)

Gracefully handles incomplete or invalid cases 


🔹 2. Lightning Web Component – Quick Case Update

A modern LWC embedded directly on the Case Record Page:

Update Status

Update Priority

Add Internal Comments

Uses lightning-record-edit-form and updateRecord

Instant UI refresh using LDS (Lightning Data Service)


🔹 3. Automation with Flows
✔ Escalation Email Flow

Sends an email when Status = Escalated.

✔ SLA Breach Flow (Scheduled Path)

Automatically marks SLA_Breached__c = TRUE when the SLA Due Date is reached.


🔹 4. Custom Fields & Data Model Enhancements

Added to the Case object:

Field	API Name	Type
Issue Type	Issue_Type__c	Picklist
SLA Due Date	SLA_Due_Date__c	Date/Time
SLA Breached	SLA_Breached__c	Checkbox
Internal Comment	Internal_Comment__c	Long Text

🔹 5. Reports & Dashboard

Includes a Case Management Overview Dashboard:

Cases by Priority (donut chart)

SLA Breached Cases (table)

Shows real-time case performance

🧩 Project Structure

force-app/main/default/
│

├── classes/
│   ├── CaseAutoAssignTrigger.trigger
│   └── CaseAutoAssignHandler.cls
│

├── lwc/
│   └── quickCaseUpdate/
│       ├── quickCaseUpdate.html
│       ├── quickCaseUpdate.js
│       └── quickCaseUpdate.js-meta.xml
│

├── objects/
│   └── Case/
│       └── fields/... (Custom Fields)
│

└── dashboards/
    └── Case_Management_Overview.dashboard


📸 Screenshots

### Case Record Page – Updated Case Details
<img src="docs/screenshots/case-record-page-1.png" width="700"/>

### Case Record Page – SLA Test Case
<img src="docs/screenshots/case-record-page-sla-test.png" width="700"/>

### Escalation Email Flow
<img src="docs/screenshots/flow-escalation-email.png" width="700"/>

### Case Management Dashboard
<img src="docs/screenshots/dashboard-case-management.png" width="700"/>

### SLA Breach Flow
<img src="docs/screenshots/flow-sla-breach.png" width="700"/>


⚙️ Setup Instructions

1. Clone the Repository
git clone https://github.com/Mezirix/salesforce-case-management-app.git
cd salesforce-case-management-app

2. Authorize Salesforce Org
sf org login web -a DevOrg

3. Deploy Source
sf project deploy start

4. Assign the LWC to Case Page

Setup → Object Manager → Case

Lightning Record Pages

Edit page

Drag Quick Case Update onto the page

Save & Activate

🧪 How to Test the App

Test Case Assignment

Create a Case

Set:

Issue Type = Technical

Priority = High

Save

Case Owner should automatically update to Tech Queue

Test Escalation Email

Open a Case

Change Status → Escalated

Email should trigger

Test SLA Breach Flow

Set SLA Due Date to a past time

Edit case once to retrigger flow

SLA_Breached__c becomes TRUE


🛠️ Technologies Used

Apex (Trigger, Handler Pattern)

Lightning Web Components (LWC)

Salesforce Flows (Record-Triggered + Scheduled)

Queue Management

SOQL

Lightning App Builder

Dashboards & Reports

Git & GitHub

VS Code + Salesforce Extension Pack


👨‍💻 Author

Christiantus Chimeziri Anyanwu

Salesforce Developer | AI & Cloud Engineer

GitHub: https://github.com/Mezirix

LinkedIn: (https://www.linkedin.com/in/chimezirianyanwu/)


📜 License

This project is open-source under the MIT License.
