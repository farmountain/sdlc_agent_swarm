# Quality Gates v0

G0 ESI integrity  
G1 Spec before build  
G2 Test before execution  
G3 Evidence before memory  
G4 Approval before risk  
G5 Risk-adaptive governance:
  - LOW → standard checks
  - MED → domain + NFR mandatory
  - HIGH → domain + NFR + approvals + stricter verifier
G6 Confidence-calibrated governance:
  - Low confidence + high risk → stricter gates
  - High confidence + low risk → streamlined gates
G7 Drift control:
  - HIGH drift blocks release
  - Repeated MED drift escalates governance
