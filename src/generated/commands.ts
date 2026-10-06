// Code generated from the AveeCare OpenAPI specification. DO NOT EDIT.

import type { ResourceSpec } from '../spec.js';

export const RESOURCES: readonly ResourceSpec[] = [
  {
    "name": "patients",
    "description": "Patients are the clients your agency provides care to, including prospective clients you have not yet admitted.",
    "ops": [
      {
        "action": "list",
        "summary": "List patients.",
        "description": "Returns a page of patients. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/patients",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "status",
            "flag": "status",
            "type": "string",
            "description": "Only return patients with this status."
          },
          {
            "wire": "active",
            "flag": "active",
            "type": "boolean",
            "description": "Only return active (`true`) or inactive (`false`) patients."
          },
          {
            "wire": "lifecycle_stage",
            "flag": "lifecycle-stage",
            "type": "enum",
            "values": [
              "Prospect",
              "Client"
            ],
            "description": "Only return prospects or clients."
          },
          {
            "wire": "office_id",
            "flag": "office-id",
            "type": "string",
            "description": "Only return patients served by this office."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a patient.",
        "description": "Creates a patient and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/patients",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "firstName",
              "flag": "first-name",
              "type": "string",
              "required": true,
              "description": "Given name."
            },
            {
              "wire": "middleName",
              "flag": "middle-name",
              "type": "string",
              "nullable": true,
              "description": "Middle name."
            },
            {
              "wire": "lastName",
              "flag": "last-name",
              "type": "string",
              "required": true,
              "description": "Family name."
            },
            {
              "wire": "goesByName",
              "flag": "goes-by-name",
              "type": "string",
              "nullable": true,
              "description": "The name the patient prefers to be called."
            },
            {
              "wire": "dateOfBirth",
              "flag": "date-of-birth",
              "type": "string",
              "nullable": true,
              "description": "Date of birth."
            },
            {
              "wire": "gender",
              "flag": "gender",
              "type": "string",
              "nullable": true,
              "description": "Gender as recorded by the agency."
            },
            {
              "wire": "primaryLanguage",
              "flag": "primary-language",
              "type": "string",
              "nullable": true,
              "description": "Language the patient is most comfortable speaking."
            },
            {
              "wire": "email",
              "flag": "email",
              "type": "string",
              "nullable": true,
              "description": "Contact email address."
            },
            {
              "wire": "active",
              "flag": "active",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the patient is an active client. Only active clients are scheduled and billed. A prospective client is always inactive. If you leave it out on create, it is `false` for a prospect or an `Inactive` or `Discharged` status and `true` otherwise."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "Inactive",
                "Prospect",
                "Discharged"
              ],
              "nullable": true,
              "description": "The client's status as shown in AveeCare. `Inactive` and `Discharged` mean the person is no longer receiving care. A prospective client (`lifecycleStage: Prospect`) reads `Prospect` even if you send `Active`. Creating a patient with `Prospect` makes them a prospective client. Defaults to `Active`."
            },
            {
              "wire": "lifecycleStage",
              "flag": "lifecycle-stage",
              "type": "enum",
              "values": [
                "Prospect",
                "Client"
              ],
              "nullable": true,
              "description": "Whether this person is a prospective client or an admitted client. `null` means client. Prospects appear in the prospective-patient pool in AveeCare, not on the patient roster."
            },
            {
              "wire": "serviceType",
              "flag": "service-type",
              "type": "enum",
              "values": [
                "SkilledNursing",
                "PhysicalTherapy",
                "Hospice",
                "StandardCare"
              ],
              "nullable": true,
              "description": "The main type of service the patient receives."
            },
            {
              "wire": "address",
              "flag": "address",
              "type": "string",
              "nullable": true,
              "description": "Street address where care is delivered."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City of the service address."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State of the service address, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code of the service address."
            },
            {
              "wire": "officeId",
              "flag": "office-id",
              "type": "string",
              "nullable": true,
              "description": "The office (branch) that serves this patient."
            },
            {
              "wire": "referralSourceId",
              "flag": "referral-source-id",
              "type": "string",
              "nullable": true,
              "description": "The referral source that sent this patient to you."
            },
            {
              "wire": "primaryDiagnosisDescription",
              "flag": "primary-diagnosis-description",
              "type": "string",
              "nullable": true,
              "description": "Primary diagnosis, in plain words."
            },
            {
              "wire": "fallRisk",
              "flag": "fall-risk",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the patient is a fall risk."
            },
            {
              "wire": "preferredCaregiverGender",
              "flag": "preferred-caregiver-gender",
              "type": "string",
              "nullable": true,
              "description": "Caregiver gender the patient prefers, if any."
            },
            {
              "wire": "schedulingNotes",
              "flag": "scheduling-notes",
              "type": "string",
              "nullable": true,
              "description": "Notes schedulers see when booking visits for this patient."
            },
            {
              "wire": "responsiblePartyName",
              "flag": "responsible-party-name",
              "type": "string",
              "nullable": true,
              "description": "Person legally responsible for the patient, if not the patient."
            },
            {
              "wire": "medicaidId",
              "flag": "medicaid-id",
              "type": "string",
              "nullable": true,
              "description": "Medicaid member ID."
            },
            {
              "wire": "medicareId",
              "flag": "medicare-id",
              "type": "string",
              "nullable": true,
              "description": "Medicare beneficiary identifier."
            },
            {
              "wire": "insuranceProvider",
              "flag": "insurance-provider",
              "type": "string",
              "nullable": true,
              "description": "Primary insurance company name."
            },
            {
              "wire": "insuranceId",
              "flag": "insurance-id",
              "type": "string",
              "nullable": true,
              "description": "Member ID with the primary insurance."
            },
            {
              "wire": "insuranceGroupNumber",
              "flag": "insurance-group-number",
              "type": "string",
              "nullable": true,
              "description": "Group number with the primary insurance."
            },
            {
              "wire": "billingContactName",
              "flag": "billing-contact-name",
              "type": "string",
              "nullable": true,
              "description": "Who receives the bills."
            },
            {
              "wire": "billingContactEmail",
              "flag": "billing-contact-email",
              "type": "string",
              "nullable": true,
              "description": "Email address bills are sent to."
            },
            {
              "wire": "billingContactPhone",
              "flag": "billing-contact-phone",
              "type": "string",
              "nullable": true,
              "description": "Phone number of the billing contact."
            },
            {
              "wire": "statementDelivery",
              "flag": "statement-delivery",
              "type": "enum",
              "values": [
                "Email",
                "Mail",
                "EmailAndMail",
                "NoStatement"
              ],
              "nullable": true,
              "description": "How statements are delivered."
            },
            {
              "wire": "paymentMethodPreference",
              "flag": "payment-method-preference",
              "type": "enum",
              "values": [
                "ACH",
                "Card",
                "Check",
                "Cash",
                "PayerOnly",
                "Other"
              ],
              "nullable": true,
              "description": "How the patient usually pays."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a patient.",
        "description": "Returns one patient by ID.",
        "method": "GET",
        "path": "/v1/patients/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a patient.",
        "description": "Changes the fields you send and returns the updated patient. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/patients/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "firstName",
              "flag": "first-name",
              "type": "string",
              "description": "Given name."
            },
            {
              "wire": "middleName",
              "flag": "middle-name",
              "type": "string",
              "nullable": true,
              "description": "Middle name."
            },
            {
              "wire": "lastName",
              "flag": "last-name",
              "type": "string",
              "description": "Family name."
            },
            {
              "wire": "goesByName",
              "flag": "goes-by-name",
              "type": "string",
              "nullable": true,
              "description": "The name the patient prefers to be called."
            },
            {
              "wire": "dateOfBirth",
              "flag": "date-of-birth",
              "type": "string",
              "nullable": true,
              "description": "Date of birth."
            },
            {
              "wire": "gender",
              "flag": "gender",
              "type": "string",
              "nullable": true,
              "description": "Gender as recorded by the agency."
            },
            {
              "wire": "primaryLanguage",
              "flag": "primary-language",
              "type": "string",
              "nullable": true,
              "description": "Language the patient is most comfortable speaking."
            },
            {
              "wire": "email",
              "flag": "email",
              "type": "string",
              "nullable": true,
              "description": "Contact email address."
            },
            {
              "wire": "active",
              "flag": "active",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the patient is an active client. Only active clients are scheduled and billed. A prospective client is always inactive. If you leave it out on create, it is `false` for a prospect or an `Inactive` or `Discharged` status and `true` otherwise."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "Inactive",
                "Prospect",
                "Discharged"
              ],
              "nullable": true,
              "description": "The client's status as shown in AveeCare. `Inactive` and `Discharged` mean the person is no longer receiving care. A prospective client (`lifecycleStage: Prospect`) reads `Prospect` even if you send `Active`. Creating a patient with `Prospect` makes them a prospective client. Defaults to `Active`."
            },
            {
              "wire": "lifecycleStage",
              "flag": "lifecycle-stage",
              "type": "enum",
              "values": [
                "Prospect",
                "Client"
              ],
              "nullable": true,
              "description": "Whether this person is a prospective client or an admitted client. `null` means client. Prospects appear in the prospective-patient pool in AveeCare, not on the patient roster."
            },
            {
              "wire": "serviceType",
              "flag": "service-type",
              "type": "enum",
              "values": [
                "SkilledNursing",
                "PhysicalTherapy",
                "Hospice",
                "StandardCare"
              ],
              "nullable": true,
              "description": "The main type of service the patient receives."
            },
            {
              "wire": "address",
              "flag": "address",
              "type": "string",
              "nullable": true,
              "description": "Street address where care is delivered."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City of the service address."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State of the service address, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code of the service address."
            },
            {
              "wire": "officeId",
              "flag": "office-id",
              "type": "string",
              "nullable": true,
              "description": "The office (branch) that serves this patient."
            },
            {
              "wire": "referralSourceId",
              "flag": "referral-source-id",
              "type": "string",
              "nullable": true,
              "description": "The referral source that sent this patient to you."
            },
            {
              "wire": "primaryDiagnosisDescription",
              "flag": "primary-diagnosis-description",
              "type": "string",
              "nullable": true,
              "description": "Primary diagnosis, in plain words."
            },
            {
              "wire": "fallRisk",
              "flag": "fall-risk",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the patient is a fall risk."
            },
            {
              "wire": "preferredCaregiverGender",
              "flag": "preferred-caregiver-gender",
              "type": "string",
              "nullable": true,
              "description": "Caregiver gender the patient prefers, if any."
            },
            {
              "wire": "schedulingNotes",
              "flag": "scheduling-notes",
              "type": "string",
              "nullable": true,
              "description": "Notes schedulers see when booking visits for this patient."
            },
            {
              "wire": "responsiblePartyName",
              "flag": "responsible-party-name",
              "type": "string",
              "nullable": true,
              "description": "Person legally responsible for the patient, if not the patient."
            },
            {
              "wire": "medicaidId",
              "flag": "medicaid-id",
              "type": "string",
              "nullable": true,
              "description": "Medicaid member ID."
            },
            {
              "wire": "medicareId",
              "flag": "medicare-id",
              "type": "string",
              "nullable": true,
              "description": "Medicare beneficiary identifier."
            },
            {
              "wire": "insuranceProvider",
              "flag": "insurance-provider",
              "type": "string",
              "nullable": true,
              "description": "Primary insurance company name."
            },
            {
              "wire": "insuranceId",
              "flag": "insurance-id",
              "type": "string",
              "nullable": true,
              "description": "Member ID with the primary insurance."
            },
            {
              "wire": "insuranceGroupNumber",
              "flag": "insurance-group-number",
              "type": "string",
              "nullable": true,
              "description": "Group number with the primary insurance."
            },
            {
              "wire": "billingContactName",
              "flag": "billing-contact-name",
              "type": "string",
              "nullable": true,
              "description": "Who receives the bills."
            },
            {
              "wire": "billingContactEmail",
              "flag": "billing-contact-email",
              "type": "string",
              "nullable": true,
              "description": "Email address bills are sent to."
            },
            {
              "wire": "billingContactPhone",
              "flag": "billing-contact-phone",
              "type": "string",
              "nullable": true,
              "description": "Phone number of the billing contact."
            },
            {
              "wire": "statementDelivery",
              "flag": "statement-delivery",
              "type": "enum",
              "values": [
                "Email",
                "Mail",
                "EmailAndMail",
                "NoStatement"
              ],
              "nullable": true,
              "description": "How statements are delivered."
            },
            {
              "wire": "paymentMethodPreference",
              "flag": "payment-method-preference",
              "type": "enum",
              "values": [
                "ACH",
                "Card",
                "Check",
                "Cash",
                "PayerOnly",
                "Other"
              ],
              "nullable": true,
              "description": "How the patient usually pays."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a patient.",
        "description": "Deletes a patient. The patient's visits, notes and other related records are not deleted. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/patients/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "contacts",
    "description": "Contacts are family members and other people connected to a patient, such as an emergency contact.",
    "ops": [
      {
        "action": "list",
        "summary": "List contacts.",
        "description": "Returns a page of contacts. Filters combine with AND. Use `next_cursor` to fetch the next page.",
        "method": "GET",
        "path": "/v1/contacts",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return contacts of this patient."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a contact.",
        "description": "Creates a contact and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/contacts",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient this contact belongs to."
            },
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "Full name."
            },
            {
              "wire": "relationship",
              "flag": "relationship",
              "type": "string",
              "nullable": true,
              "description": "Relationship to the patient."
            },
            {
              "wire": "phoneNumber",
              "flag": "phone-number",
              "type": "string",
              "nullable": true,
              "description": "Phone number."
            },
            {
              "wire": "email",
              "flag": "email",
              "type": "string",
              "nullable": true,
              "description": "Email address."
            },
            {
              "wire": "preferEmail",
              "flag": "prefer-email",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the contact prefers email over phone."
            },
            {
              "wire": "emergencyContact",
              "flag": "emergency-contact",
              "type": "boolean",
              "nullable": true,
              "description": "Whether this person is an emergency contact."
            },
            {
              "wire": "notificationPolicy",
              "flag": "notification-policy",
              "type": "enum",
              "values": [
                "All",
                "Emergencies"
              ],
              "nullable": true,
              "description": "Which updates the contact is notified about."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a contact.",
        "description": "Returns one contact by ID.",
        "method": "GET",
        "path": "/v1/contacts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a contact.",
        "description": "Changes the fields you send and returns the updated contact. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/contacts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "Full name."
            },
            {
              "wire": "relationship",
              "flag": "relationship",
              "type": "string",
              "nullable": true,
              "description": "Relationship to the patient."
            },
            {
              "wire": "phoneNumber",
              "flag": "phone-number",
              "type": "string",
              "nullable": true,
              "description": "Phone number."
            },
            {
              "wire": "email",
              "flag": "email",
              "type": "string",
              "nullable": true,
              "description": "Email address."
            },
            {
              "wire": "preferEmail",
              "flag": "prefer-email",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the contact prefers email over phone."
            },
            {
              "wire": "emergencyContact",
              "flag": "emergency-contact",
              "type": "boolean",
              "nullable": true,
              "description": "Whether this person is an emergency contact."
            },
            {
              "wire": "notificationPolicy",
              "flag": "notification-policy",
              "type": "enum",
              "values": [
                "All",
                "Emergencies"
              ],
              "nullable": true,
              "description": "Which updates the contact is notified about."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a contact.",
        "description": "Deletes a contact. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/contacts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "allergies",
    "description": "Allergies recorded on a patient's profile.",
    "ops": [
      {
        "action": "list",
        "summary": "List allergies.",
        "description": "Returns a page of allergies. Filters combine with AND. Use `next_cursor` to fetch the next page.",
        "method": "GET",
        "path": "/v1/allergies",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return allergies of this patient."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an allergy.",
        "description": "Creates an allergy and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/allergies",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient who has this allergy."
            },
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "What the patient is allergic to."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "Reaction and other details."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an allergy.",
        "description": "Returns one allergy by ID.",
        "method": "GET",
        "path": "/v1/allergies/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an allergy.",
        "description": "Changes the fields you send and returns the updated allergy. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/allergies/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "What the patient is allergic to."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "Reaction and other details."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an allergy.",
        "description": "Deletes an allergy. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/allergies/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "medications",
    "description": "Medications on a patient's medication list, with the schedule caregivers follow when they give or assist with them.",
    "ops": [
      {
        "action": "list",
        "summary": "List medications.",
        "description": "Returns a page of medications. Filters combine with AND. Use `next_cursor` to fetch the next page.",
        "method": "GET",
        "path": "/v1/medications",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return medications of this patient."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Active",
              "OnHold",
              "Discontinued"
            ],
            "description": "Only return medications with this status."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a medication.",
        "description": "Creates a medication and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/medications",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient who takes this medication."
            },
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "Drug name, without the strength."
            },
            {
              "wire": "strength",
              "flag": "strength",
              "type": "string",
              "nullable": true,
              "description": "Strength per dose unit."
            },
            {
              "wire": "form",
              "flag": "form",
              "type": "string",
              "nullable": true,
              "description": "Dose form."
            },
            {
              "wire": "route",
              "flag": "route",
              "type": "string",
              "nullable": true,
              "description": "How it is taken."
            },
            {
              "wire": "directions",
              "flag": "directions",
              "type": "string",
              "nullable": true,
              "description": "Directions as written on the prescription."
            },
            {
              "wire": "indication",
              "flag": "indication",
              "type": "string",
              "nullable": true,
              "description": "What the medication is for."
            },
            {
              "wire": "scheduleType",
              "flag": "schedule-type",
              "type": "enum",
              "values": [
                "Scheduled",
                "PRN"
              ],
              "nullable": true,
              "description": "`Scheduled` for regular doses, `PRN` for as-needed."
            },
            {
              "wire": "prnReason",
              "flag": "prn-reason",
              "type": "string",
              "nullable": true,
              "description": "For as-needed medications, when to give it."
            },
            {
              "wire": "prnMaxDailyDoses",
              "flag": "prn-max-daily-doses",
              "type": "integer",
              "nullable": true,
              "description": "For as-needed medications, the most doses allowed in a day."
            },
            {
              "wire": "prnMinIntervalHours",
              "flag": "prn-min-interval-hours",
              "type": "number",
              "nullable": true,
              "description": "For as-needed medications, the minimum hours between doses."
            },
            {
              "wire": "startDate",
              "flag": "start-date",
              "type": "string",
              "nullable": true,
              "description": "Date the patient started the medication."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "OnHold",
                "Discontinued"
              ],
              "nullable": true,
              "description": "Whether the medication is currently given."
            },
            {
              "wire": "discontinuedDate",
              "flag": "discontinued-date",
              "type": "string",
              "nullable": true,
              "description": "Date the medication was stopped."
            },
            {
              "wire": "discontinuedReason",
              "flag": "discontinued-reason",
              "type": "string",
              "nullable": true,
              "description": "Why the medication was stopped."
            },
            {
              "wire": "prescriber",
              "flag": "prescriber",
              "type": "string",
              "nullable": true,
              "description": "Prescribing clinician."
            },
            {
              "wire": "prescriberPhone",
              "flag": "prescriber-phone",
              "type": "string",
              "nullable": true,
              "description": "Prescriber's phone number."
            },
            {
              "wire": "pharmacy",
              "flag": "pharmacy",
              "type": "string",
              "nullable": true,
              "description": "Pharmacy that fills the prescription."
            },
            {
              "wire": "pharmacyPhone",
              "flag": "pharmacy-phone",
              "type": "string",
              "nullable": true,
              "description": "Pharmacy phone number."
            },
            {
              "wire": "requiresWitness",
              "flag": "requires-witness",
              "type": "boolean",
              "nullable": true,
              "description": "Whether a second person must witness each dose."
            },
            {
              "wire": "quantityOnHand",
              "flag": "quantity-on-hand",
              "type": "number",
              "nullable": true,
              "description": "Doses currently on hand."
            },
            {
              "wire": "refillsRemaining",
              "flag": "refills-remaining",
              "type": "integer",
              "nullable": true,
              "description": "Refills left on the prescription."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Other notes."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a medication.",
        "description": "Returns one medication by ID.",
        "method": "GET",
        "path": "/v1/medications/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a medication.",
        "description": "Changes the fields you send and returns the updated medication. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/medications/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "Drug name, without the strength."
            },
            {
              "wire": "strength",
              "flag": "strength",
              "type": "string",
              "nullable": true,
              "description": "Strength per dose unit."
            },
            {
              "wire": "form",
              "flag": "form",
              "type": "string",
              "nullable": true,
              "description": "Dose form."
            },
            {
              "wire": "route",
              "flag": "route",
              "type": "string",
              "nullable": true,
              "description": "How it is taken."
            },
            {
              "wire": "directions",
              "flag": "directions",
              "type": "string",
              "nullable": true,
              "description": "Directions as written on the prescription."
            },
            {
              "wire": "indication",
              "flag": "indication",
              "type": "string",
              "nullable": true,
              "description": "What the medication is for."
            },
            {
              "wire": "scheduleType",
              "flag": "schedule-type",
              "type": "enum",
              "values": [
                "Scheduled",
                "PRN"
              ],
              "nullable": true,
              "description": "`Scheduled` for regular doses, `PRN` for as-needed."
            },
            {
              "wire": "prnReason",
              "flag": "prn-reason",
              "type": "string",
              "nullable": true,
              "description": "For as-needed medications, when to give it."
            },
            {
              "wire": "prnMaxDailyDoses",
              "flag": "prn-max-daily-doses",
              "type": "integer",
              "nullable": true,
              "description": "For as-needed medications, the most doses allowed in a day."
            },
            {
              "wire": "prnMinIntervalHours",
              "flag": "prn-min-interval-hours",
              "type": "number",
              "nullable": true,
              "description": "For as-needed medications, the minimum hours between doses."
            },
            {
              "wire": "startDate",
              "flag": "start-date",
              "type": "string",
              "nullable": true,
              "description": "Date the patient started the medication."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "OnHold",
                "Discontinued"
              ],
              "nullable": true,
              "description": "Whether the medication is currently given."
            },
            {
              "wire": "discontinuedDate",
              "flag": "discontinued-date",
              "type": "string",
              "nullable": true,
              "description": "Date the medication was stopped."
            },
            {
              "wire": "discontinuedReason",
              "flag": "discontinued-reason",
              "type": "string",
              "nullable": true,
              "description": "Why the medication was stopped."
            },
            {
              "wire": "prescriber",
              "flag": "prescriber",
              "type": "string",
              "nullable": true,
              "description": "Prescribing clinician."
            },
            {
              "wire": "prescriberPhone",
              "flag": "prescriber-phone",
              "type": "string",
              "nullable": true,
              "description": "Prescriber's phone number."
            },
            {
              "wire": "pharmacy",
              "flag": "pharmacy",
              "type": "string",
              "nullable": true,
              "description": "Pharmacy that fills the prescription."
            },
            {
              "wire": "pharmacyPhone",
              "flag": "pharmacy-phone",
              "type": "string",
              "nullable": true,
              "description": "Pharmacy phone number."
            },
            {
              "wire": "requiresWitness",
              "flag": "requires-witness",
              "type": "boolean",
              "nullable": true,
              "description": "Whether a second person must witness each dose."
            },
            {
              "wire": "quantityOnHand",
              "flag": "quantity-on-hand",
              "type": "number",
              "nullable": true,
              "description": "Doses currently on hand."
            },
            {
              "wire": "refillsRemaining",
              "flag": "refills-remaining",
              "type": "integer",
              "nullable": true,
              "description": "Refills left on the prescription."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Other notes."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a medication.",
        "description": "Deletes a medication. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/medications/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "care-goals",
    "description": "Goals of care set for a patient, such as walking to the mailbox unaided.",
    "ops": [
      {
        "action": "list",
        "summary": "List care goals.",
        "description": "Returns a page of care goals. Filters combine with AND. Use `next_cursor` to fetch the next page.",
        "method": "GET",
        "path": "/v1/care-goals",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return goals of this patient."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a care goal.",
        "description": "Creates a care goal and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/care-goals",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient this goal is for."
            },
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "Short name of the goal."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "What success looks like."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a care goal.",
        "description": "Returns one care goal by ID.",
        "method": "GET",
        "path": "/v1/care-goals/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a care goal.",
        "description": "Changes the fields you send and returns the updated care goal. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/care-goals/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "Short name of the goal."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "What success looks like."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a care goal.",
        "description": "Deletes a care goal. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/care-goals/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "patient-notes",
    "description": "Notes your staff and caregivers keep on a patient's profile.",
    "ops": [
      {
        "action": "list",
        "summary": "List patient notes.",
        "description": "Returns a page of patient notes. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/patient-notes",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return notes about this patient."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a patient note.",
        "description": "Creates a patient note and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/patient-notes",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient the note is about."
            },
            {
              "wire": "content",
              "flag": "content",
              "type": "string",
              "required": true,
              "description": "The note."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a patient note.",
        "description": "Returns one patient note by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/patient-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a patient note.",
        "description": "Changes the fields you send and returns the updated patient note. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/patient-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "content",
              "flag": "content",
              "type": "string",
              "description": "The note."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a patient note.",
        "description": "Deletes a patient note. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/patient-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "medication-administrations",
    "description": "The medication administration record (MAR): each dose a caregiver gave, or the reason it was not given. Read-only.",
    "ops": [
      {
        "action": "list",
        "summary": "List medication administrations.",
        "description": "Returns a page of medication administrations. Filters combine with AND. Use `next_cursor` to fetch the next page.",
        "method": "GET",
        "path": "/v1/medication-administrations",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return doses for this patient."
          },
          {
            "wire": "medication_id",
            "flag": "medication-id",
            "type": "string",
            "description": "Only return doses of this medication."
          },
          {
            "wire": "scheduled_date",
            "flag": "scheduled-date",
            "type": "string",
            "description": "Only return doses due on this date."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a medication administration.",
        "description": "Returns one medication administration by ID.",
        "method": "GET",
        "path": "/v1/medication-administrations/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  },
  {
    "name": "oasis-assessments",
    "description": "OASIS assessments recorded for Medicare home health patients. This lists each assessment and its status; the item-level answers are not included. Read-only.",
    "ops": [
      {
        "action": "list",
        "summary": "List OASIS assessments.",
        "description": "Returns a page of OASIS assessments. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/oasis-assessments",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return assessments of this patient."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Draft",
              "Completed",
              "Exported",
              "Accepted",
              "Rejected",
              "Inactivated"
            ],
            "description": "Only return assessments with this status."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an OASIS assessment.",
        "description": "Returns one OASIS assessment by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/oasis-assessments/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  },
  {
    "name": "caregivers",
    "description": "Caregivers are the aides, nurses and therapists your agency schedules to visit patients.",
    "ops": [
      {
        "action": "list",
        "summary": "List caregivers.",
        "description": "Returns a page of caregivers. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/caregivers",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Active",
              "OnLeave",
              "Inactive"
            ],
            "description": "Only return caregivers with this employment status."
          },
          {
            "wire": "active",
            "flag": "active",
            "type": "boolean",
            "description": "Only return caregivers who can (`true`) or cannot (`false`) be scheduled."
          },
          {
            "wire": "office_id",
            "flag": "office-id",
            "type": "string",
            "description": "Only return caregivers from this office."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a caregiver.",
        "description": "Creates a caregiver and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/caregivers",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "firstName",
              "flag": "first-name",
              "type": "string",
              "required": true,
              "description": "Given name."
            },
            {
              "wire": "middleName",
              "flag": "middle-name",
              "type": "string",
              "nullable": true,
              "description": "Middle name."
            },
            {
              "wire": "lastName",
              "flag": "last-name",
              "type": "string",
              "required": true,
              "description": "Family name."
            },
            {
              "wire": "goesByName",
              "flag": "goes-by-name",
              "type": "string",
              "nullable": true,
              "description": "The name the caregiver prefers to be called."
            },
            {
              "wire": "email",
              "flag": "email",
              "type": "string",
              "nullable": true,
              "description": "Work email address."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "OnLeave",
                "Inactive"
              ],
              "nullable": true,
              "description": "Employment status."
            },
            {
              "wire": "active",
              "flag": "active",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the caregiver can be scheduled. If you leave it out on create, it is `false` for an `Inactive` status and `true` otherwise."
            },
            {
              "wire": "dateOfBirth",
              "flag": "date-of-birth",
              "type": "string",
              "nullable": true,
              "description": "Date of birth."
            },
            {
              "wire": "gender",
              "flag": "gender",
              "type": "string",
              "nullable": true,
              "description": "Gender as recorded by the agency."
            },
            {
              "wire": "primaryLanguage",
              "flag": "primary-language",
              "type": "string",
              "nullable": true,
              "description": "Language the caregiver is most comfortable speaking."
            },
            {
              "wire": "address",
              "flag": "address",
              "type": "string",
              "nullable": true,
              "description": "Home street address."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code."
            },
            {
              "wire": "officeId",
              "flag": "office-id",
              "type": "string",
              "nullable": true,
              "description": "The office (branch) the caregiver works from."
            },
            {
              "wire": "licenseType",
              "flag": "license-type",
              "type": "string",
              "nullable": true,
              "description": "License or credential type."
            },
            {
              "wire": "npiNumber",
              "flag": "npi-number",
              "type": "string",
              "nullable": true,
              "description": "National Provider Identifier, for licensed clinicians."
            },
            {
              "wire": "stateLicenseNumber",
              "flag": "state-license-number",
              "type": "string",
              "nullable": true,
              "description": "State license number."
            },
            {
              "wire": "stateLicenseState",
              "flag": "state-license-state",
              "type": "string",
              "nullable": true,
              "description": "State that issued the license."
            },
            {
              "wire": "stateLicenseExpiry",
              "flag": "state-license-expiry",
              "type": "string",
              "nullable": true,
              "description": "License expiry date, as `YYYY-MM-DD`."
            },
            {
              "wire": "isLiveInCaregiver",
              "flag": "is-live-in-caregiver",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the caregiver works live-in shifts."
            },
            {
              "wire": "schedulingNotes",
              "flag": "scheduling-notes",
              "type": "string",
              "nullable": true,
              "description": "Notes schedulers see when booking this caregiver."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a caregiver.",
        "description": "Returns one caregiver by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/caregivers/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a caregiver.",
        "description": "Changes the fields you send and returns the updated caregiver. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/caregivers/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "firstName",
              "flag": "first-name",
              "type": "string",
              "description": "Given name."
            },
            {
              "wire": "middleName",
              "flag": "middle-name",
              "type": "string",
              "nullable": true,
              "description": "Middle name."
            },
            {
              "wire": "lastName",
              "flag": "last-name",
              "type": "string",
              "description": "Family name."
            },
            {
              "wire": "goesByName",
              "flag": "goes-by-name",
              "type": "string",
              "nullable": true,
              "description": "The name the caregiver prefers to be called."
            },
            {
              "wire": "email",
              "flag": "email",
              "type": "string",
              "nullable": true,
              "description": "Work email address."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "OnLeave",
                "Inactive"
              ],
              "nullable": true,
              "description": "Employment status."
            },
            {
              "wire": "active",
              "flag": "active",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the caregiver can be scheduled. If you leave it out on create, it is `false` for an `Inactive` status and `true` otherwise."
            },
            {
              "wire": "dateOfBirth",
              "flag": "date-of-birth",
              "type": "string",
              "nullable": true,
              "description": "Date of birth."
            },
            {
              "wire": "gender",
              "flag": "gender",
              "type": "string",
              "nullable": true,
              "description": "Gender as recorded by the agency."
            },
            {
              "wire": "primaryLanguage",
              "flag": "primary-language",
              "type": "string",
              "nullable": true,
              "description": "Language the caregiver is most comfortable speaking."
            },
            {
              "wire": "address",
              "flag": "address",
              "type": "string",
              "nullable": true,
              "description": "Home street address."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code."
            },
            {
              "wire": "officeId",
              "flag": "office-id",
              "type": "string",
              "nullable": true,
              "description": "The office (branch) the caregiver works from."
            },
            {
              "wire": "licenseType",
              "flag": "license-type",
              "type": "string",
              "nullable": true,
              "description": "License or credential type."
            },
            {
              "wire": "npiNumber",
              "flag": "npi-number",
              "type": "string",
              "nullable": true,
              "description": "National Provider Identifier, for licensed clinicians."
            },
            {
              "wire": "stateLicenseNumber",
              "flag": "state-license-number",
              "type": "string",
              "nullable": true,
              "description": "State license number."
            },
            {
              "wire": "stateLicenseState",
              "flag": "state-license-state",
              "type": "string",
              "nullable": true,
              "description": "State that issued the license."
            },
            {
              "wire": "stateLicenseExpiry",
              "flag": "state-license-expiry",
              "type": "string",
              "nullable": true,
              "description": "License expiry date, as `YYYY-MM-DD`."
            },
            {
              "wire": "isLiveInCaregiver",
              "flag": "is-live-in-caregiver",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the caregiver works live-in shifts."
            },
            {
              "wire": "schedulingNotes",
              "flag": "scheduling-notes",
              "type": "string",
              "nullable": true,
              "description": "Notes schedulers see when booking this caregiver."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a caregiver.",
        "description": "Deletes a caregiver. The caregiver's past visits and other related records are not deleted. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/caregivers/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "caregiver-notes",
    "description": "Notes your staff keep on a caregiver's profile.",
    "ops": [
      {
        "action": "list",
        "summary": "List caregiver notes.",
        "description": "Returns a page of caregiver notes. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/caregiver-notes",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return notes about this caregiver."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a caregiver note.",
        "description": "Creates a caregiver note and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/caregiver-notes",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "required": true,
              "description": "The caregiver the note is about."
            },
            {
              "wire": "content",
              "flag": "content",
              "type": "string",
              "required": true,
              "description": "The note."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a caregiver note.",
        "description": "Returns one caregiver note by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/caregiver-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a caregiver note.",
        "description": "Changes the fields you send and returns the updated caregiver note. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/caregiver-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "content",
              "flag": "content",
              "type": "string",
              "description": "The note."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a caregiver note.",
        "description": "Deletes a caregiver note. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/caregiver-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "certifications",
    "description": "Certifications, licenses and background checks on a caregiver's profile, with their expiry dates.",
    "ops": [
      {
        "action": "list",
        "summary": "List certifications.",
        "description": "Returns a page of certifications. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/certifications",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return certifications of this caregiver."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a certification.",
        "description": "Creates a certification and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/certifications",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "required": true,
              "description": "The caregiver who holds it."
            },
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "Name of the certification."
            },
            {
              "wire": "certKind",
              "flag": "cert-kind",
              "type": "string",
              "nullable": true,
              "description": "Kind of credential, such as a certification or a background check."
            },
            {
              "wire": "obtained",
              "flag": "obtained",
              "type": "string",
              "nullable": true,
              "description": "Date it was obtained."
            },
            {
              "wire": "expires",
              "flag": "expires",
              "type": "string",
              "nullable": true,
              "description": "Date it expires."
            },
            {
              "wire": "checkAgency",
              "flag": "check-agency",
              "type": "string",
              "nullable": true,
              "description": "For background checks, the agency that ran the check."
            },
            {
              "wire": "checkState",
              "flag": "check-state",
              "type": "string",
              "nullable": true,
              "description": "For background checks, the state the check covers."
            },
            {
              "wire": "checkResult",
              "flag": "check-result",
              "type": "string",
              "nullable": true,
              "description": "For background checks, the result."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a certification.",
        "description": "Returns one certification by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/certifications/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a certification.",
        "description": "Changes the fields you send and returns the updated certification. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/certifications/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "Name of the certification."
            },
            {
              "wire": "certKind",
              "flag": "cert-kind",
              "type": "string",
              "nullable": true,
              "description": "Kind of credential, such as a certification or a background check."
            },
            {
              "wire": "obtained",
              "flag": "obtained",
              "type": "string",
              "nullable": true,
              "description": "Date it was obtained."
            },
            {
              "wire": "expires",
              "flag": "expires",
              "type": "string",
              "nullable": true,
              "description": "Date it expires."
            },
            {
              "wire": "checkAgency",
              "flag": "check-agency",
              "type": "string",
              "nullable": true,
              "description": "For background checks, the agency that ran the check."
            },
            {
              "wire": "checkState",
              "flag": "check-state",
              "type": "string",
              "nullable": true,
              "description": "For background checks, the state the check covers."
            },
            {
              "wire": "checkResult",
              "flag": "check-result",
              "type": "string",
              "nullable": true,
              "description": "For background checks, the result."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a certification.",
        "description": "Deletes a certification. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/certifications/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "availability",
    "description": "When a caregiver can or cannot work. A window is either a weekly recurring time on one weekday, or a one-off date range such as time off.",
    "ops": [
      {
        "action": "list",
        "summary": "List availability windows.",
        "description": "Returns a page of availability windows. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/availability",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return windows of this caregiver."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an availability window.",
        "description": "Creates an availability window and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/availability",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "required": true,
              "description": "The caregiver."
            },
            {
              "wire": "isAvailable",
              "flag": "is-available",
              "type": "boolean",
              "nullable": true,
              "description": "`true` when the caregiver can work in this window, `false` for time off."
            },
            {
              "wire": "recurring",
              "flag": "recurring",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the window repeats weekly."
            },
            {
              "wire": "dayOfWeek",
              "flag": "day-of-week",
              "type": "integer",
              "nullable": true,
              "description": "For weekly windows, the weekday: 0 is Sunday, 6 is Saturday."
            },
            {
              "wire": "startMinute",
              "flag": "start-minute",
              "type": "integer",
              "nullable": true,
              "description": "For weekly windows, the start time in minutes after midnight."
            },
            {
              "wire": "endMinute",
              "flag": "end-minute",
              "type": "integer",
              "nullable": true,
              "description": "For weekly windows, the end time in minutes after midnight."
            },
            {
              "wire": "intervalWeeks",
              "flag": "interval-weeks",
              "type": "integer",
              "nullable": true,
              "description": "For weekly windows, repeat every this many weeks. Defaults to every week."
            },
            {
              "wire": "effectiveFrom",
              "flag": "effective-from",
              "type": "string",
              "nullable": true,
              "description": "First date a weekly window applies."
            },
            {
              "wire": "effectiveTo",
              "flag": "effective-to",
              "type": "string",
              "nullable": true,
              "description": "Last date a weekly window applies; `null` for no end."
            },
            {
              "wire": "startDateTime",
              "flag": "start-date-time",
              "type": "string",
              "nullable": true,
              "description": "For one-off windows, when it starts."
            },
            {
              "wire": "endDateTime",
              "flag": "end-date-time",
              "type": "string",
              "nullable": true,
              "description": "For one-off windows, when it ends."
            },
            {
              "wire": "isPreferred",
              "flag": "is-preferred",
              "type": "boolean",
              "nullable": true,
              "description": "Whether these are the caregiver's preferred hours."
            },
            {
              "wire": "reason",
              "flag": "reason",
              "type": "string",
              "nullable": true,
              "description": "Why the caregiver is unavailable, for time off."
            },
            {
              "wire": "isActive",
              "flag": "is-active",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the window is in effect."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an availability window.",
        "description": "Returns one availability window by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/availability/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an availability window.",
        "description": "Changes the fields you send and returns the updated availability window. Send `null` to clear an optional field. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/availability/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "isAvailable",
              "flag": "is-available",
              "type": "boolean",
              "nullable": true,
              "description": "`true` when the caregiver can work in this window, `false` for time off."
            },
            {
              "wire": "recurring",
              "flag": "recurring",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the window repeats weekly."
            },
            {
              "wire": "dayOfWeek",
              "flag": "day-of-week",
              "type": "integer",
              "nullable": true,
              "description": "For weekly windows, the weekday: 0 is Sunday, 6 is Saturday."
            },
            {
              "wire": "startMinute",
              "flag": "start-minute",
              "type": "integer",
              "nullable": true,
              "description": "For weekly windows, the start time in minutes after midnight."
            },
            {
              "wire": "endMinute",
              "flag": "end-minute",
              "type": "integer",
              "nullable": true,
              "description": "For weekly windows, the end time in minutes after midnight."
            },
            {
              "wire": "intervalWeeks",
              "flag": "interval-weeks",
              "type": "integer",
              "nullable": true,
              "description": "For weekly windows, repeat every this many weeks. Defaults to every week."
            },
            {
              "wire": "effectiveFrom",
              "flag": "effective-from",
              "type": "string",
              "nullable": true,
              "description": "First date a weekly window applies."
            },
            {
              "wire": "effectiveTo",
              "flag": "effective-to",
              "type": "string",
              "nullable": true,
              "description": "Last date a weekly window applies; `null` for no end."
            },
            {
              "wire": "startDateTime",
              "flag": "start-date-time",
              "type": "string",
              "nullable": true,
              "description": "For one-off windows, when it starts."
            },
            {
              "wire": "endDateTime",
              "flag": "end-date-time",
              "type": "string",
              "nullable": true,
              "description": "For one-off windows, when it ends."
            },
            {
              "wire": "isPreferred",
              "flag": "is-preferred",
              "type": "boolean",
              "nullable": true,
              "description": "Whether these are the caregiver's preferred hours."
            },
            {
              "wire": "reason",
              "flag": "reason",
              "type": "string",
              "nullable": true,
              "description": "Why the caregiver is unavailable, for time off."
            },
            {
              "wire": "isActive",
              "flag": "is-active",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the window is in effect."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an availability window.",
        "description": "Deletes an availability window. Available to keys belonging to office staff and caregivers. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/availability/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "specializations",
    "description": "Skills and specialties on a caregiver's profile, such as dementia care or Hoyer lift transfers.",
    "ops": [
      {
        "action": "list",
        "summary": "List specializations.",
        "description": "Returns a page of specializations. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/specializations",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return specializations of this caregiver."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a specialization.",
        "description": "Creates a specialization and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/specializations",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "required": true,
              "description": "The caregiver."
            },
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "Name of the skill."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "Details."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a specialization.",
        "description": "Returns one specialization by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/specializations/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a specialization.",
        "description": "Changes the fields you send and returns the updated specialization. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/specializations/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "Name of the skill."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "Details."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a specialization.",
        "description": "Deletes a specialization. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/specializations/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "applicants",
    "description": "People who applied to work for your agency, tracked through your hiring stages until they are hired as caregivers.",
    "ops": [
      {
        "action": "list",
        "summary": "List applicants.",
        "description": "Returns a page of applicants. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/applicants",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "stage",
            "flag": "stage",
            "type": "string",
            "description": "Only return applicants in this hiring stage."
          },
          {
            "wire": "office_id",
            "flag": "office-id",
            "type": "string",
            "description": "Only return applicants to this office."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an applicant.",
        "description": "Creates an applicant and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/applicants",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "firstName",
              "flag": "first-name",
              "type": "string",
              "required": true,
              "description": "Given name."
            },
            {
              "wire": "middleName",
              "flag": "middle-name",
              "type": "string",
              "nullable": true,
              "description": "Middle name."
            },
            {
              "wire": "lastName",
              "flag": "last-name",
              "type": "string",
              "required": true,
              "description": "Family name."
            },
            {
              "wire": "email",
              "flag": "email",
              "type": "string",
              "nullable": true,
              "description": "Email address."
            },
            {
              "wire": "phone",
              "flag": "phone",
              "type": "string",
              "nullable": true,
              "description": "Phone number."
            },
            {
              "wire": "stage",
              "flag": "stage",
              "type": "string",
              "nullable": true,
              "description": "Hiring stage, as named in your pipeline."
            },
            {
              "wire": "applicationDate",
              "flag": "application-date",
              "type": "string",
              "nullable": true,
              "description": "When the application was received."
            },
            {
              "wire": "applicationSource",
              "flag": "application-source",
              "type": "string",
              "nullable": true,
              "description": "Where the applicant found you."
            },
            {
              "wire": "referredBy",
              "flag": "referred-by",
              "type": "string",
              "nullable": true,
              "description": "Who referred the applicant."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code."
            },
            {
              "wire": "desiredStartDate",
              "flag": "desired-start-date",
              "type": "string",
              "nullable": true,
              "description": "Earliest date the applicant can start."
            },
            {
              "wire": "desiredPayRate",
              "flag": "desired-pay-rate",
              "type": "number",
              "nullable": true,
              "description": "Hourly pay the applicant is asking for, in dollars."
            },
            {
              "wire": "availableHoursPerWeek",
              "flag": "available-hours-per-week",
              "type": "integer",
              "nullable": true,
              "description": "Hours per week the applicant can work."
            },
            {
              "wire": "yearsExperience",
              "flag": "years-experience",
              "type": "integer",
              "nullable": true,
              "description": "Years of caregiving experience."
            },
            {
              "wire": "primaryLanguage",
              "flag": "primary-language",
              "type": "string",
              "nullable": true,
              "description": "Primary language."
            },
            {
              "wire": "hasDriversLicense",
              "flag": "has-drivers-license",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the applicant has a driver's license."
            },
            {
              "wire": "hasReliableTransportation",
              "flag": "has-reliable-transportation",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the applicant has reliable transportation."
            },
            {
              "wire": "hasCPRCertification",
              "flag": "has-cpr-certification",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the applicant holds a current CPR certification."
            },
            {
              "wire": "interviewDate",
              "flag": "interview-date",
              "type": "string",
              "nullable": true,
              "description": "Scheduled or completed interview time."
            },
            {
              "wire": "offerStatus",
              "flag": "offer-status",
              "type": "string",
              "nullable": true,
              "description": "Status of any job offer."
            },
            {
              "wire": "officeId",
              "flag": "office-id",
              "type": "string",
              "nullable": true,
              "description": "The office the applicant applied to."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Recruiter notes."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an applicant.",
        "description": "Returns one applicant by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/applicants/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an applicant.",
        "description": "Changes the fields you send and returns the updated applicant. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/applicants/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "firstName",
              "flag": "first-name",
              "type": "string",
              "description": "Given name."
            },
            {
              "wire": "middleName",
              "flag": "middle-name",
              "type": "string",
              "nullable": true,
              "description": "Middle name."
            },
            {
              "wire": "lastName",
              "flag": "last-name",
              "type": "string",
              "description": "Family name."
            },
            {
              "wire": "email",
              "flag": "email",
              "type": "string",
              "nullable": true,
              "description": "Email address."
            },
            {
              "wire": "phone",
              "flag": "phone",
              "type": "string",
              "nullable": true,
              "description": "Phone number."
            },
            {
              "wire": "stage",
              "flag": "stage",
              "type": "string",
              "nullable": true,
              "description": "Hiring stage, as named in your pipeline."
            },
            {
              "wire": "applicationDate",
              "flag": "application-date",
              "type": "string",
              "nullable": true,
              "description": "When the application was received."
            },
            {
              "wire": "applicationSource",
              "flag": "application-source",
              "type": "string",
              "nullable": true,
              "description": "Where the applicant found you."
            },
            {
              "wire": "referredBy",
              "flag": "referred-by",
              "type": "string",
              "nullable": true,
              "description": "Who referred the applicant."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code."
            },
            {
              "wire": "desiredStartDate",
              "flag": "desired-start-date",
              "type": "string",
              "nullable": true,
              "description": "Earliest date the applicant can start."
            },
            {
              "wire": "desiredPayRate",
              "flag": "desired-pay-rate",
              "type": "number",
              "nullable": true,
              "description": "Hourly pay the applicant is asking for, in dollars."
            },
            {
              "wire": "availableHoursPerWeek",
              "flag": "available-hours-per-week",
              "type": "integer",
              "nullable": true,
              "description": "Hours per week the applicant can work."
            },
            {
              "wire": "yearsExperience",
              "flag": "years-experience",
              "type": "integer",
              "nullable": true,
              "description": "Years of caregiving experience."
            },
            {
              "wire": "primaryLanguage",
              "flag": "primary-language",
              "type": "string",
              "nullable": true,
              "description": "Primary language."
            },
            {
              "wire": "hasDriversLicense",
              "flag": "has-drivers-license",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the applicant has a driver's license."
            },
            {
              "wire": "hasReliableTransportation",
              "flag": "has-reliable-transportation",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the applicant has reliable transportation."
            },
            {
              "wire": "hasCPRCertification",
              "flag": "has-cpr-certification",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the applicant holds a current CPR certification."
            },
            {
              "wire": "interviewDate",
              "flag": "interview-date",
              "type": "string",
              "nullable": true,
              "description": "Scheduled or completed interview time."
            },
            {
              "wire": "offerStatus",
              "flag": "offer-status",
              "type": "string",
              "nullable": true,
              "description": "Status of any job offer."
            },
            {
              "wire": "officeId",
              "flag": "office-id",
              "type": "string",
              "nullable": true,
              "description": "The office the applicant applied to."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Recruiter notes."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an applicant.",
        "description": "Deletes an applicant. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/applicants/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "visits",
    "description": "Visits are scheduled or completed caregiver shifts at a patient's home. A visit's patient, caregiver, times and status are set when it is created; reschedule or reassign a visit in AveeCare.",
    "ops": [
      {
        "action": "list",
        "summary": "List visits.",
        "description": "Returns a page of visits, ordered by scheduled start, earliest first. Filters combine with AND. Use `next_cursor` to fetch the next page.",
        "method": "GET",
        "path": "/v1/visits",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "start_from",
            "flag": "start-from",
            "type": "string",
            "required": true,
            "description": "Start of the window (inclusive), ISO 8601 with a time zone. Visits are listed by scheduled start. Both `start_from` and `start_to` are required, and the window can be at most 93 days."
          },
          {
            "wire": "start_to",
            "flag": "start-to",
            "type": "string",
            "required": true,
            "description": "End of the window (exclusive), ISO 8601 with a time zone. At most 93 days after `start_from`."
          },
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return visits for this patient."
          },
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return visits assigned to this caregiver."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Scheduled",
              "InProgress",
              "Cancelled",
              "Completed",
              "Late",
              "OverTime",
              "Incomplete"
            ],
            "description": "Only return visits with this status."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a visit.",
        "description": "Creates a visit and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/visits",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient being visited."
            },
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver assigned to the visit; `null` for an open shift."
            },
            {
              "wire": "startTime",
              "flag": "start-time",
              "type": "string",
              "required": true,
              "description": "Scheduled start."
            },
            {
              "wire": "endTime",
              "flag": "end-time",
              "type": "string",
              "required": true,
              "description": "Scheduled end."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Scheduled",
                "InProgress",
                "Cancelled",
                "Completed",
                "Late",
                "OverTime",
                "Incomplete"
              ],
              "nullable": true,
              "description": "Where the visit is in its day. New visits are `Scheduled`."
            },
            {
              "wire": "title",
              "flag": "title",
              "type": "string",
              "nullable": true,
              "description": "Short title shown on the schedule."
            },
            {
              "wire": "isAllDay",
              "flag": "is-all-day",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the visit spans the whole day, such as a live-in shift."
            },
            {
              "wire": "tasks",
              "flag": "tasks",
              "type": "string",
              "array": true,
              "nullable": true,
              "description": "Tasks the caregiver should complete during the visit."
            },
            {
              "wire": "reason",
              "flag": "reason",
              "type": "string",
              "nullable": true,
              "description": "Why the visit is scheduled, if it is not routine."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Notes for the caregiver about this visit."
            },
            {
              "wire": "serviceCode",
              "flag": "service-code",
              "type": "string",
              "nullable": true,
              "description": "Billing service code for the visit."
            },
            {
              "wire": "locationAddress",
              "flag": "location-address",
              "type": "string",
              "nullable": true,
              "description": "Where the visit takes place, when it is not the patient's home address."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a visit.",
        "description": "Returns one visit by ID.",
        "method": "GET",
        "path": "/v1/visits/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a visit.",
        "description": "Changes the fields you send and returns the updated visit. Send `null` to clear an optional field. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/visits/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "title",
              "flag": "title",
              "type": "string",
              "nullable": true,
              "description": "Short title shown on the schedule."
            },
            {
              "wire": "isAllDay",
              "flag": "is-all-day",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the visit spans the whole day, such as a live-in shift."
            },
            {
              "wire": "tasks",
              "flag": "tasks",
              "type": "string",
              "array": true,
              "nullable": true,
              "description": "Tasks the caregiver should complete during the visit."
            },
            {
              "wire": "reason",
              "flag": "reason",
              "type": "string",
              "nullable": true,
              "description": "Why the visit is scheduled, if it is not routine."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Notes for the caregiver about this visit."
            },
            {
              "wire": "serviceCode",
              "flag": "service-code",
              "type": "string",
              "nullable": true,
              "description": "Billing service code for the visit."
            },
            {
              "wire": "locationAddress",
              "flag": "location-address",
              "type": "string",
              "nullable": true,
              "description": "Where the visit takes place, when it is not the patient's home address."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a visit.",
        "description": "Deletes a visit. The visit moves to the schedule's recycle bin in AveeCare, where staff can restore it. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/visits/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "visit-notes",
    "description": "Notes written about a visit by the caregiver or office staff.",
    "ops": [
      {
        "action": "list",
        "summary": "List visit notes.",
        "description": "Returns a page of visit notes. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/visit-notes",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "visit_id",
            "flag": "visit-id",
            "type": "string",
            "description": "Only return notes about this visit."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a visit note.",
        "description": "Creates a visit note and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/visit-notes",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "visitId",
              "flag": "visit-id",
              "type": "string",
              "required": true,
              "description": "The visit the note is about."
            },
            {
              "wire": "content",
              "flag": "content",
              "type": "string",
              "required": true,
              "description": "The note."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a visit note.",
        "description": "Returns one visit note by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/visit-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a visit note.",
        "description": "Changes the fields you send and returns the updated visit note. Send `null` to clear an optional field. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/visit-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "content",
              "flag": "content",
              "type": "string",
              "description": "The note."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a visit note.",
        "description": "Deletes a visit note. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/visit-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "visit-requests",
    "description": "Requests from caregivers to pick up visits with a patient, which office staff approve or deny.",
    "ops": [
      {
        "action": "list",
        "summary": "List visit requests.",
        "description": "Returns a page of visit requests. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/visit-requests",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return requests from this caregiver."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Pending",
              "Approved",
              "Denied",
              "Cancelled"
            ],
            "description": "Only return requests with this status."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a visit request.",
        "description": "Creates a visit request and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/visit-requests",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver asking for the visit. With a caregiver's API key this is always that caregiver (leave it out); office staff must send it."
            },
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "nullable": true,
              "description": "The patient the caregiver would visit."
            },
            {
              "wire": "patientName",
              "flag": "patient-name",
              "type": "string",
              "nullable": true,
              "description": "Patient's display name."
            },
            {
              "wire": "preferredStartDate",
              "flag": "preferred-start-date",
              "type": "string",
              "nullable": true,
              "description": "First date the caregiver could start."
            },
            {
              "wire": "preferredEndDate",
              "flag": "preferred-end-date",
              "type": "string",
              "nullable": true,
              "description": "Last date of the request."
            },
            {
              "wire": "preferredTimeOfDay",
              "flag": "preferred-time-of-day",
              "type": "string",
              "nullable": true,
              "description": "Time of day the caregiver prefers."
            },
            {
              "wire": "reason",
              "flag": "reason",
              "type": "string",
              "nullable": true,
              "description": "Why the caregiver is asking."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Pending",
                "Approved",
                "Denied",
                "Cancelled"
              ],
              "nullable": true,
              "description": "Where the request stands. A caregiver's key creates `Pending` requests and can only change its own pending request to `Cancelled`; approving and denying is for office staff."
            },
            {
              "wire": "adminResponse",
              "flag": "admin-response",
              "type": "string",
              "nullable": true,
              "description": "The office's reply. Set by office staff."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a visit request.",
        "description": "Returns one visit request by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/visit-requests/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a visit request.",
        "description": "Changes the fields you send and returns the updated visit request. Send `null` to clear an optional field. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/visit-requests/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "nullable": true,
              "description": "The patient the caregiver would visit."
            },
            {
              "wire": "patientName",
              "flag": "patient-name",
              "type": "string",
              "nullable": true,
              "description": "Patient's display name."
            },
            {
              "wire": "preferredStartDate",
              "flag": "preferred-start-date",
              "type": "string",
              "nullable": true,
              "description": "First date the caregiver could start."
            },
            {
              "wire": "preferredEndDate",
              "flag": "preferred-end-date",
              "type": "string",
              "nullable": true,
              "description": "Last date of the request."
            },
            {
              "wire": "preferredTimeOfDay",
              "flag": "preferred-time-of-day",
              "type": "string",
              "nullable": true,
              "description": "Time of day the caregiver prefers."
            },
            {
              "wire": "reason",
              "flag": "reason",
              "type": "string",
              "nullable": true,
              "description": "Why the caregiver is asking."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Pending",
                "Approved",
                "Denied",
                "Cancelled"
              ],
              "nullable": true,
              "description": "Where the request stands. A caregiver's key creates `Pending` requests and can only change its own pending request to `Cancelled`; approving and denying is for office staff."
            },
            {
              "wire": "adminResponse",
              "flag": "admin-response",
              "type": "string",
              "nullable": true,
              "description": "The office's reply. Set by office staff."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a visit request.",
        "description": "Deletes a visit request. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/visit-requests/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "open-shifts",
    "description": "Open shifts are unassigned visits offered to caregivers so one of them can claim it.",
    "ops": [
      {
        "action": "list",
        "summary": "List open shifts.",
        "description": "Returns a page of open shifts. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/open-shifts",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Active",
              "Filled",
              "Cancelled"
            ],
            "description": "Only return offers with this status."
          },
          {
            "wire": "visit_id",
            "flag": "visit-id",
            "type": "string",
            "description": "Only return offers for this visit."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an open shift.",
        "description": "Creates an open shift and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/open-shifts",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "visitId",
              "flag": "visit-id",
              "type": "string",
              "required": true,
              "description": "The unassigned visit being offered."
            },
            {
              "wire": "broadcastDate",
              "flag": "broadcast-date",
              "type": "string",
              "nullable": true,
              "description": "When the shift was offered."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "Filled",
                "Cancelled"
              ],
              "nullable": true,
              "description": "Whether the offer is still open."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an open shift.",
        "description": "Returns one open shift by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/open-shifts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an open shift.",
        "description": "Changes the fields you send and returns the updated open shift. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/open-shifts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "broadcastDate",
              "flag": "broadcast-date",
              "type": "string",
              "nullable": true,
              "description": "When the shift was offered."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "Filled",
                "Cancelled"
              ],
              "nullable": true,
              "description": "Whether the offer is still open."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an open shift.",
        "description": "Deletes an open shift. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/open-shifts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "shift-swaps",
    "description": "Requests from one caregiver to hand a visit to another, which the other caregiver and then the office approve.",
    "ops": [
      {
        "action": "list",
        "summary": "List shift swaps.",
        "description": "Returns a page of shift swaps. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/shift-swaps",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Pending",
              "Accepted",
              "Declined",
              "Cancelled",
              "AdminApproved",
              "AdminDenied"
            ],
            "description": "Only return swaps with this status."
          },
          {
            "wire": "visit_id",
            "flag": "visit-id",
            "type": "string",
            "description": "Only return swaps for this visit."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a shift swap.",
        "description": "Creates a shift swap and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/shift-swaps",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "visitId",
              "flag": "visit-id",
              "type": "string",
              "required": true,
              "description": "The visit to hand over."
            },
            {
              "wire": "requestingCaregiverId",
              "flag": "requesting-caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver giving up the visit. With a caregiver's API key this is always that caregiver (leave it out), and the visit must be assigned to them; office staff must send it."
            },
            {
              "wire": "targetCaregiverId",
              "flag": "target-caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver asked to take the visit."
            },
            {
              "wire": "targetCaregiverName",
              "flag": "target-caregiver-name",
              "type": "string",
              "nullable": true,
              "description": "Display name of the target caregiver."
            },
            {
              "wire": "reason",
              "flag": "reason",
              "type": "string",
              "nullable": true,
              "description": "Why the swap is requested."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Pending",
                "Accepted",
                "Declined",
                "Cancelled",
                "AdminApproved",
                "AdminDenied"
              ],
              "nullable": true,
              "description": "Where the swap stands. With a caregiver's key: new swaps are `Pending`; the asked caregiver changes a `Pending` swap to `Accepted` or `Declined`; the requesting caregiver can change it to `Cancelled`. `AdminApproved` and `AdminDenied` are for office staff."
            },
            {
              "wire": "requestDate",
              "flag": "request-date",
              "type": "string",
              "nullable": true,
              "description": "When the swap was requested."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a shift swap.",
        "description": "Returns one shift swap by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/shift-swaps/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a shift swap.",
        "description": "Changes the fields you send and returns the updated shift swap. Send `null` to clear an optional field. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/shift-swaps/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "targetCaregiverId",
              "flag": "target-caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver asked to take the visit."
            },
            {
              "wire": "targetCaregiverName",
              "flag": "target-caregiver-name",
              "type": "string",
              "nullable": true,
              "description": "Display name of the target caregiver."
            },
            {
              "wire": "reason",
              "flag": "reason",
              "type": "string",
              "nullable": true,
              "description": "Why the swap is requested."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Pending",
                "Accepted",
                "Declined",
                "Cancelled",
                "AdminApproved",
                "AdminDenied"
              ],
              "nullable": true,
              "description": "Where the swap stands. With a caregiver's key: new swaps are `Pending`; the asked caregiver changes a `Pending` swap to `Accepted` or `Declined`; the requesting caregiver can change it to `Cancelled`. `AdminApproved` and `AdminDenied` are for office staff."
            },
            {
              "wire": "requestDate",
              "flag": "request-date",
              "type": "string",
              "nullable": true,
              "description": "When the swap was requested."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a shift swap.",
        "description": "Deletes a shift swap. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/shift-swaps/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "care-plans",
    "description": "Care plans describe the services a patient receives, how often, and when the plan is next reviewed. The plan's goals and task lists are managed in AveeCare and are not included here.",
    "ops": [
      {
        "action": "list",
        "summary": "List care plans.",
        "description": "Returns a page of care plans. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/care-plans",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return plans for this patient."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Active",
              "Draft",
              "Archived",
              "UnderReview",
              "Completed",
              "Discontinued"
            ],
            "description": "Only return plans with this status."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a care plan.",
        "description": "Creates a care plan and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/care-plans",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient the plan is for."
            },
            {
              "wire": "title",
              "flag": "title",
              "type": "string",
              "required": true,
              "description": "Plan title."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "Draft",
                "Archived",
                "UnderReview",
                "Completed",
                "Discontinued"
              ],
              "nullable": true,
              "description": "Where the plan is in its lifecycle."
            },
            {
              "wire": "serviceType",
              "flag": "service-type",
              "type": "string",
              "nullable": true,
              "description": "Type of service the plan covers."
            },
            {
              "wire": "frequency",
              "flag": "frequency",
              "type": "string",
              "nullable": true,
              "description": "How often visits happen under the plan."
            },
            {
              "wire": "startDate",
              "flag": "start-date",
              "type": "string",
              "nullable": true,
              "description": "Date the plan takes effect."
            },
            {
              "wire": "endDate",
              "flag": "end-date",
              "type": "string",
              "nullable": true,
              "description": "Date the plan ends; `null` if open-ended."
            },
            {
              "wire": "reviewDate",
              "flag": "review-date",
              "type": "string",
              "nullable": true,
              "description": "Date the plan is next due for review."
            },
            {
              "wire": "reviewIntervalDays",
              "flag": "review-interval-days",
              "type": "integer",
              "nullable": true,
              "description": "Days between reviews."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a care plan.",
        "description": "Returns one care plan by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/care-plans/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a care plan.",
        "description": "Changes the fields you send and returns the updated care plan. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/care-plans/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "title",
              "flag": "title",
              "type": "string",
              "description": "Plan title."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "Draft",
                "Archived",
                "UnderReview",
                "Completed",
                "Discontinued"
              ],
              "nullable": true,
              "description": "Where the plan is in its lifecycle."
            },
            {
              "wire": "serviceType",
              "flag": "service-type",
              "type": "string",
              "nullable": true,
              "description": "Type of service the plan covers."
            },
            {
              "wire": "frequency",
              "flag": "frequency",
              "type": "string",
              "nullable": true,
              "description": "How often visits happen under the plan."
            },
            {
              "wire": "startDate",
              "flag": "start-date",
              "type": "string",
              "nullable": true,
              "description": "Date the plan takes effect."
            },
            {
              "wire": "endDate",
              "flag": "end-date",
              "type": "string",
              "nullable": true,
              "description": "Date the plan ends; `null` if open-ended."
            },
            {
              "wire": "reviewDate",
              "flag": "review-date",
              "type": "string",
              "nullable": true,
              "description": "Date the plan is next due for review."
            },
            {
              "wire": "reviewIntervalDays",
              "flag": "review-interval-days",
              "type": "integer",
              "nullable": true,
              "description": "Days between reviews."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a care plan.",
        "description": "Deletes a care plan. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/care-plans/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "progress-notes",
    "description": "Progress notes are the clinical summaries caregivers write after a visit.",
    "ops": [
      {
        "action": "list",
        "summary": "List progress notes.",
        "description": "Returns a page of progress notes. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/progress-notes",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return notes for this patient."
          },
          {
            "wire": "visit_id",
            "flag": "visit-id",
            "type": "string",
            "description": "Only return notes for this visit."
          },
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return notes by this caregiver."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a progress note.",
        "description": "Creates a progress note and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/progress-notes",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "visitId",
              "flag": "visit-id",
              "type": "string",
              "required": true,
              "description": "The visit the note documents."
            },
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient."
            },
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver who wrote the note. With a caregiver's API key this is always that caregiver (leave it out), and the visit must be assigned to them."
            },
            {
              "wire": "summary",
              "flag": "summary",
              "type": "string",
              "required": true,
              "description": "The written summary of the visit."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a progress note.",
        "description": "Returns one progress note by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/progress-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a progress note.",
        "description": "Changes the fields you send and returns the updated progress note. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/progress-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "summary",
              "flag": "summary",
              "type": "string",
              "description": "The written summary of the visit."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a progress note.",
        "description": "Deletes a progress note. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/progress-notes/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "authorizations",
    "description": "Payer authorizations: how many units of a service a payer has approved for a patient, and over what dates.",
    "ops": [
      {
        "action": "list",
        "summary": "List authorizations.",
        "description": "Returns a page of authorizations. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/authorizations",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return authorizations for this patient."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Active",
              "Expired",
              "PendingRenewal"
            ],
            "description": "Only return authorizations with this status."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an authorization.",
        "description": "Creates an authorization and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/authorizations",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "required": true,
              "description": "The patient the authorization covers."
            },
            {
              "wire": "payerName",
              "flag": "payer-name",
              "type": "string",
              "nullable": true,
              "description": "The payer that issued it."
            },
            {
              "wire": "authorizationNumber",
              "flag": "authorization-number",
              "type": "string",
              "nullable": true,
              "description": "The payer's authorization number."
            },
            {
              "wire": "serviceType",
              "flag": "service-type",
              "type": "string",
              "nullable": true,
              "description": "Service authorized."
            },
            {
              "wire": "procedureCode",
              "flag": "procedure-code",
              "type": "string",
              "nullable": true,
              "description": "Procedure (HCPCS) code billed against it."
            },
            {
              "wire": "modifiers",
              "flag": "modifiers",
              "type": "string",
              "nullable": true,
              "description": "Procedure code modifiers, comma separated."
            },
            {
              "wire": "startDate",
              "flag": "start-date",
              "type": "string",
              "nullable": true,
              "description": "First date the authorization covers."
            },
            {
              "wire": "endDate",
              "flag": "end-date",
              "type": "string",
              "nullable": true,
              "description": "Last date the authorization covers."
            },
            {
              "wire": "authorizedUnits",
              "flag": "authorized-units",
              "type": "integer",
              "nullable": true,
              "description": "Units approved."
            },
            {
              "wire": "unitType",
              "flag": "unit-type",
              "type": "string",
              "nullable": true,
              "description": "What a unit is, in the payer's words."
            },
            {
              "wire": "unitBasis",
              "flag": "unit-basis",
              "type": "enum",
              "values": [
                "Time",
                "Visits",
                "Days"
              ],
              "nullable": true,
              "description": "Whether units count time, visits or days."
            },
            {
              "wire": "minutesPerUnit",
              "flag": "minutes-per-unit",
              "type": "integer",
              "nullable": true,
              "description": "For time-based units, minutes in one unit."
            },
            {
              "wire": "frequency",
              "flag": "frequency",
              "type": "string",
              "nullable": true,
              "description": "Frequency the payer approved."
            },
            {
              "wire": "placeOfService",
              "flag": "place-of-service",
              "type": "string",
              "nullable": true,
              "description": "Place-of-service code."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "Expired",
                "PendingRenewal"
              ],
              "nullable": true,
              "description": "Whether the authorization is in effect."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Notes."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an authorization.",
        "description": "Returns one authorization by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/authorizations/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an authorization.",
        "description": "Changes the fields you send and returns the updated authorization. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/authorizations/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "payerName",
              "flag": "payer-name",
              "type": "string",
              "nullable": true,
              "description": "The payer that issued it."
            },
            {
              "wire": "authorizationNumber",
              "flag": "authorization-number",
              "type": "string",
              "nullable": true,
              "description": "The payer's authorization number."
            },
            {
              "wire": "serviceType",
              "flag": "service-type",
              "type": "string",
              "nullable": true,
              "description": "Service authorized."
            },
            {
              "wire": "procedureCode",
              "flag": "procedure-code",
              "type": "string",
              "nullable": true,
              "description": "Procedure (HCPCS) code billed against it."
            },
            {
              "wire": "modifiers",
              "flag": "modifiers",
              "type": "string",
              "nullable": true,
              "description": "Procedure code modifiers, comma separated."
            },
            {
              "wire": "startDate",
              "flag": "start-date",
              "type": "string",
              "nullable": true,
              "description": "First date the authorization covers."
            },
            {
              "wire": "endDate",
              "flag": "end-date",
              "type": "string",
              "nullable": true,
              "description": "Last date the authorization covers."
            },
            {
              "wire": "authorizedUnits",
              "flag": "authorized-units",
              "type": "integer",
              "nullable": true,
              "description": "Units approved."
            },
            {
              "wire": "unitType",
              "flag": "unit-type",
              "type": "string",
              "nullable": true,
              "description": "What a unit is, in the payer's words."
            },
            {
              "wire": "unitBasis",
              "flag": "unit-basis",
              "type": "enum",
              "values": [
                "Time",
                "Visits",
                "Days"
              ],
              "nullable": true,
              "description": "Whether units count time, visits or days."
            },
            {
              "wire": "minutesPerUnit",
              "flag": "minutes-per-unit",
              "type": "integer",
              "nullable": true,
              "description": "For time-based units, minutes in one unit."
            },
            {
              "wire": "frequency",
              "flag": "frequency",
              "type": "string",
              "nullable": true,
              "description": "Frequency the payer approved."
            },
            {
              "wire": "placeOfService",
              "flag": "place-of-service",
              "type": "string",
              "nullable": true,
              "description": "Place-of-service code."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Active",
                "Expired",
                "PendingRenewal"
              ],
              "nullable": true,
              "description": "Whether the authorization is in effect."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Notes."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an authorization.",
        "description": "Deletes an authorization. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/authorizations/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "incidents",
    "description": "Incident reports: falls, injuries, medication errors and other events that need follow-up, often for regulatory reporting.",
    "ops": [
      {
        "action": "list",
        "summary": "List incidents.",
        "description": "Returns a page of incidents. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/incidents",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Open",
              "Monitoring",
              "AwaitingFollowUp",
              "Resolved",
              "Closed"
            ],
            "description": "Only return incidents with this follow-up status."
          },
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return incidents involving this patient."
          },
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return incidents involving this caregiver."
          },
          {
            "wire": "resolved",
            "flag": "resolved",
            "type": "boolean",
            "description": "Only return resolved (`true`) or unresolved (`false`) incidents."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an incident.",
        "description": "Creates an incident and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/incidents",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "title",
              "flag": "title",
              "type": "string",
              "required": true,
              "description": "Short summary."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "What happened."
            },
            {
              "wire": "incidentDateTime",
              "flag": "incident-date-time",
              "type": "string",
              "nullable": true,
              "description": "When the incident happened."
            },
            {
              "wire": "category",
              "flag": "category",
              "type": "enum",
              "values": [
                "Fall",
                "Medication",
                "Behavioral",
                "Injury",
                "Equipment",
                "Attendance",
                "Conduct",
                "Other"
              ],
              "nullable": true,
              "description": "Kind of incident."
            },
            {
              "wire": "severity",
              "flag": "severity",
              "type": "enum",
              "values": [
                "Low",
                "Medium",
                "High",
                "Critical"
              ],
              "nullable": true,
              "description": "How serious it was."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Open",
                "Monitoring",
                "AwaitingFollowUp",
                "Resolved",
                "Closed"
              ],
              "nullable": true,
              "description": "Where follow-up stands. New incidents start `Open`. Only keys belonging to office staff can set this."
            },
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "nullable": true,
              "description": "The patient involved."
            },
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver involved."
            },
            {
              "wire": "visitId",
              "flag": "visit-id",
              "type": "string",
              "nullable": true,
              "description": "The visit during which it happened."
            },
            {
              "wire": "actionsTaken",
              "flag": "actions-taken",
              "type": "string",
              "nullable": true,
              "description": "What was done at the time."
            },
            {
              "wire": "injuryBodyPart",
              "flag": "injury-body-part",
              "type": "string",
              "nullable": true,
              "description": "Body part injured, if any."
            },
            {
              "wire": "witnessName",
              "flag": "witness-name",
              "type": "string",
              "nullable": true,
              "description": "Witness, if any."
            },
            {
              "wire": "emergencyServicesContacted",
              "flag": "emergency-services-contacted",
              "type": "boolean",
              "nullable": true,
              "description": "Whether 911 or other emergency services were called."
            },
            {
              "wire": "hospitalTransport",
              "flag": "hospital-transport",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the patient went to hospital."
            },
            {
              "wire": "hospitalName",
              "flag": "hospital-name",
              "type": "string",
              "nullable": true,
              "description": "Hospital, if transported."
            },
            {
              "wire": "physicianNotified",
              "flag": "physician-notified",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the patient's physician was told."
            },
            {
              "wire": "familyNotified",
              "flag": "family-notified",
              "type": "boolean",
              "nullable": true,
              "description": "Whether family was told."
            },
            {
              "wire": "regulatoryReportRequired",
              "flag": "regulatory-report-required",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the incident must be reported to a regulator."
            },
            {
              "wire": "followUpRequired",
              "flag": "follow-up-required",
              "type": "boolean",
              "nullable": true,
              "description": "Whether follow-up is needed."
            },
            {
              "wire": "followUpDueAt",
              "flag": "follow-up-due-at",
              "type": "string",
              "nullable": true,
              "description": "When follow-up is due. Only keys belonging to office staff can set this."
            },
            {
              "wire": "followUpNotes",
              "flag": "follow-up-notes",
              "type": "string",
              "nullable": true,
              "description": "Follow-up notes."
            },
            {
              "wire": "resolved",
              "flag": "resolved",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the incident is resolved. Only keys belonging to office staff can set this."
            },
            {
              "wire": "resolutionNotes",
              "flag": "resolution-notes",
              "type": "string",
              "nullable": true,
              "description": "How it was resolved. Only keys belonging to office staff can set this."
            },
            {
              "wire": "isConfidential",
              "flag": "is-confidential",
              "type": "boolean",
              "nullable": true,
              "description": "Whether only administrators can see it. Only keys belonging to office staff can set this."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an incident.",
        "description": "Returns one incident by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/incidents/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an incident.",
        "description": "Changes the fields you send and returns the updated incident. Send `null` to clear an optional field. Available to keys belonging to office staff and caregivers. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/incidents/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "title",
              "flag": "title",
              "type": "string",
              "description": "Short summary."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "What happened."
            },
            {
              "wire": "incidentDateTime",
              "flag": "incident-date-time",
              "type": "string",
              "nullable": true,
              "description": "When the incident happened."
            },
            {
              "wire": "category",
              "flag": "category",
              "type": "enum",
              "values": [
                "Fall",
                "Medication",
                "Behavioral",
                "Injury",
                "Equipment",
                "Attendance",
                "Conduct",
                "Other"
              ],
              "nullable": true,
              "description": "Kind of incident."
            },
            {
              "wire": "severity",
              "flag": "severity",
              "type": "enum",
              "values": [
                "Low",
                "Medium",
                "High",
                "Critical"
              ],
              "nullable": true,
              "description": "How serious it was."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Open",
                "Monitoring",
                "AwaitingFollowUp",
                "Resolved",
                "Closed"
              ],
              "nullable": true,
              "description": "Where follow-up stands. New incidents start `Open`. Only keys belonging to office staff can set this."
            },
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "nullable": true,
              "description": "The patient involved."
            },
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver involved."
            },
            {
              "wire": "visitId",
              "flag": "visit-id",
              "type": "string",
              "nullable": true,
              "description": "The visit during which it happened."
            },
            {
              "wire": "actionsTaken",
              "flag": "actions-taken",
              "type": "string",
              "nullable": true,
              "description": "What was done at the time."
            },
            {
              "wire": "injuryBodyPart",
              "flag": "injury-body-part",
              "type": "string",
              "nullable": true,
              "description": "Body part injured, if any."
            },
            {
              "wire": "witnessName",
              "flag": "witness-name",
              "type": "string",
              "nullable": true,
              "description": "Witness, if any."
            },
            {
              "wire": "emergencyServicesContacted",
              "flag": "emergency-services-contacted",
              "type": "boolean",
              "nullable": true,
              "description": "Whether 911 or other emergency services were called."
            },
            {
              "wire": "hospitalTransport",
              "flag": "hospital-transport",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the patient went to hospital."
            },
            {
              "wire": "hospitalName",
              "flag": "hospital-name",
              "type": "string",
              "nullable": true,
              "description": "Hospital, if transported."
            },
            {
              "wire": "physicianNotified",
              "flag": "physician-notified",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the patient's physician was told."
            },
            {
              "wire": "familyNotified",
              "flag": "family-notified",
              "type": "boolean",
              "nullable": true,
              "description": "Whether family was told."
            },
            {
              "wire": "regulatoryReportRequired",
              "flag": "regulatory-report-required",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the incident must be reported to a regulator."
            },
            {
              "wire": "followUpRequired",
              "flag": "follow-up-required",
              "type": "boolean",
              "nullable": true,
              "description": "Whether follow-up is needed."
            },
            {
              "wire": "followUpDueAt",
              "flag": "follow-up-due-at",
              "type": "string",
              "nullable": true,
              "description": "When follow-up is due. Only keys belonging to office staff can set this."
            },
            {
              "wire": "followUpNotes",
              "flag": "follow-up-notes",
              "type": "string",
              "nullable": true,
              "description": "Follow-up notes."
            },
            {
              "wire": "resolved",
              "flag": "resolved",
              "type": "boolean",
              "nullable": true,
              "description": "Whether the incident is resolved. Only keys belonging to office staff can set this."
            },
            {
              "wire": "resolutionNotes",
              "flag": "resolution-notes",
              "type": "string",
              "nullable": true,
              "description": "How it was resolved. Only keys belonging to office staff can set this."
            },
            {
              "wire": "isConfidential",
              "flag": "is-confidential",
              "type": "boolean",
              "nullable": true,
              "description": "Whether only administrators can see it. Only keys belonging to office staff can set this."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an incident.",
        "description": "Deletes an incident. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/incidents/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "events",
    "description": "Events your agency documents about a patient, caregiver or visit, such as a complaint, a compliment or an attendance issue.",
    "ops": [
      {
        "action": "list",
        "summary": "List events.",
        "description": "Returns a page of events. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/events",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Open",
              "Monitoring",
              "AwaitingFollowUp",
              "Resolved",
              "Closed"
            ],
            "description": "Only return events with this follow-up status."
          },
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return events involving this patient."
          },
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return events involving this caregiver."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an event.",
        "description": "Creates an event and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/events",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "title",
              "flag": "title",
              "type": "string",
              "required": true,
              "description": "Short summary."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "What happened."
            },
            {
              "wire": "category",
              "flag": "category",
              "type": "string",
              "nullable": true,
              "description": "Category, as named in your agency's event types."
            },
            {
              "wire": "severity",
              "flag": "severity",
              "type": "enum",
              "values": [
                "Low",
                "Medium",
                "High",
                "Critical"
              ],
              "nullable": true,
              "description": "How serious it was."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Open",
                "Monitoring",
                "AwaitingFollowUp",
                "Resolved",
                "Closed"
              ],
              "nullable": true,
              "description": "Where follow-up stands."
            },
            {
              "wire": "occurredAt",
              "flag": "occurred-at",
              "type": "string",
              "nullable": true,
              "description": "When it happened."
            },
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "nullable": true,
              "description": "The patient involved."
            },
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver involved."
            },
            {
              "wire": "visitId",
              "flag": "visit-id",
              "type": "string",
              "nullable": true,
              "description": "The visit involved."
            },
            {
              "wire": "pointValue",
              "flag": "point-value",
              "type": "number",
              "nullable": true,
              "description": "Attendance points this event counts for, if your agency uses a points policy."
            },
            {
              "wire": "actionsTaken",
              "flag": "actions-taken",
              "type": "string",
              "nullable": true,
              "description": "What was done."
            },
            {
              "wire": "outcome",
              "flag": "outcome",
              "type": "string",
              "nullable": true,
              "description": "Outcome."
            },
            {
              "wire": "followUpRequired",
              "flag": "follow-up-required",
              "type": "boolean",
              "nullable": true,
              "description": "Whether follow-up is needed."
            },
            {
              "wire": "followUpDueAt",
              "flag": "follow-up-due-at",
              "type": "string",
              "nullable": true,
              "description": "When follow-up is due."
            },
            {
              "wire": "followUpNotes",
              "flag": "follow-up-notes",
              "type": "string",
              "nullable": true,
              "description": "Follow-up notes."
            },
            {
              "wire": "resolutionNotes",
              "flag": "resolution-notes",
              "type": "string",
              "nullable": true,
              "description": "How it was resolved."
            },
            {
              "wire": "isConfidential",
              "flag": "is-confidential",
              "type": "boolean",
              "nullable": true,
              "description": "Whether only administrators can see it."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an event.",
        "description": "Returns one event by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/events/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an event.",
        "description": "Changes the fields you send and returns the updated event. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/events/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "title",
              "flag": "title",
              "type": "string",
              "description": "Short summary."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "What happened."
            },
            {
              "wire": "category",
              "flag": "category",
              "type": "string",
              "nullable": true,
              "description": "Category, as named in your agency's event types."
            },
            {
              "wire": "severity",
              "flag": "severity",
              "type": "enum",
              "values": [
                "Low",
                "Medium",
                "High",
                "Critical"
              ],
              "nullable": true,
              "description": "How serious it was."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "Open",
                "Monitoring",
                "AwaitingFollowUp",
                "Resolved",
                "Closed"
              ],
              "nullable": true,
              "description": "Where follow-up stands."
            },
            {
              "wire": "occurredAt",
              "flag": "occurred-at",
              "type": "string",
              "nullable": true,
              "description": "When it happened."
            },
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "nullable": true,
              "description": "The patient involved."
            },
            {
              "wire": "caregiverId",
              "flag": "caregiver-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver involved."
            },
            {
              "wire": "visitId",
              "flag": "visit-id",
              "type": "string",
              "nullable": true,
              "description": "The visit involved."
            },
            {
              "wire": "pointValue",
              "flag": "point-value",
              "type": "number",
              "nullable": true,
              "description": "Attendance points this event counts for, if your agency uses a points policy."
            },
            {
              "wire": "actionsTaken",
              "flag": "actions-taken",
              "type": "string",
              "nullable": true,
              "description": "What was done."
            },
            {
              "wire": "outcome",
              "flag": "outcome",
              "type": "string",
              "nullable": true,
              "description": "Outcome."
            },
            {
              "wire": "followUpRequired",
              "flag": "follow-up-required",
              "type": "boolean",
              "nullable": true,
              "description": "Whether follow-up is needed."
            },
            {
              "wire": "followUpDueAt",
              "flag": "follow-up-due-at",
              "type": "string",
              "nullable": true,
              "description": "When follow-up is due."
            },
            {
              "wire": "followUpNotes",
              "flag": "follow-up-notes",
              "type": "string",
              "nullable": true,
              "description": "Follow-up notes."
            },
            {
              "wire": "resolutionNotes",
              "flag": "resolution-notes",
              "type": "string",
              "nullable": true,
              "description": "How it was resolved."
            },
            {
              "wire": "isConfidential",
              "flag": "is-confidential",
              "type": "boolean",
              "nullable": true,
              "description": "Whether only administrators can see it."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an event.",
        "description": "Deletes an event. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/events/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "referral-sources",
    "description": "Hospitals, physicians, case managers and other organizations that refer clients to your agency.",
    "ops": [
      {
        "action": "list",
        "summary": "List referral sources.",
        "description": "Returns a page of referral sources. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/referral-sources",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "is_active",
            "flag": "is-active",
            "type": "boolean",
            "description": "Only return active (`true`) or inactive (`false`) sources."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a referral source.",
        "description": "Creates a referral source and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/referral-sources",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "Name of the source."
            },
            {
              "wire": "type",
              "flag": "type",
              "type": "string",
              "nullable": true,
              "description": "Kind of source, such as Hospital or Physician."
            },
            {
              "wire": "organization",
              "flag": "organization",
              "type": "string",
              "nullable": true,
              "description": "Organization the contact works for."
            },
            {
              "wire": "contactName",
              "flag": "contact-name",
              "type": "string",
              "nullable": true,
              "description": "Main contact."
            },
            {
              "wire": "contactTitle",
              "flag": "contact-title",
              "type": "string",
              "nullable": true,
              "description": "Contact's job title."
            },
            {
              "wire": "contactPhone",
              "flag": "contact-phone",
              "type": "string",
              "nullable": true,
              "description": "Contact's phone number."
            },
            {
              "wire": "contactEmail",
              "flag": "contact-email",
              "type": "string",
              "nullable": true,
              "description": "Contact's email address."
            },
            {
              "wire": "address",
              "flag": "address",
              "type": "string",
              "nullable": true,
              "description": "Street address."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Notes."
            },
            {
              "wire": "isActive",
              "flag": "is-active",
              "type": "boolean",
              "nullable": true,
              "description": "Whether you still receive referrals from this source."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a referral source.",
        "description": "Returns one referral source by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/referral-sources/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a referral source.",
        "description": "Changes the fields you send and returns the updated referral source. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/referral-sources/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "Name of the source."
            },
            {
              "wire": "type",
              "flag": "type",
              "type": "string",
              "nullable": true,
              "description": "Kind of source, such as Hospital or Physician."
            },
            {
              "wire": "organization",
              "flag": "organization",
              "type": "string",
              "nullable": true,
              "description": "Organization the contact works for."
            },
            {
              "wire": "contactName",
              "flag": "contact-name",
              "type": "string",
              "nullable": true,
              "description": "Main contact."
            },
            {
              "wire": "contactTitle",
              "flag": "contact-title",
              "type": "string",
              "nullable": true,
              "description": "Contact's job title."
            },
            {
              "wire": "contactPhone",
              "flag": "contact-phone",
              "type": "string",
              "nullable": true,
              "description": "Contact's phone number."
            },
            {
              "wire": "contactEmail",
              "flag": "contact-email",
              "type": "string",
              "nullable": true,
              "description": "Contact's email address."
            },
            {
              "wire": "address",
              "flag": "address",
              "type": "string",
              "nullable": true,
              "description": "Street address."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Notes."
            },
            {
              "wire": "isActive",
              "flag": "is-active",
              "type": "boolean",
              "nullable": true,
              "description": "Whether you still receive referrals from this source."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a referral source.",
        "description": "Deletes a referral source. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/referral-sources/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "referrals",
    "description": "Individual referrals of a prospective client, tracked from first contact to admission.",
    "ops": [
      {
        "action": "list",
        "summary": "List referrals.",
        "description": "Returns a page of referrals. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/referrals",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "New",
              "Contacted",
              "AssessmentScheduled",
              "AssessmentCompleted",
              "ServiceAgreementSent",
              "Admitted",
              "Declined",
              "Lost"
            ],
            "description": "Only return referrals with this status."
          },
          {
            "wire": "referral_source_id",
            "flag": "referral-source-id",
            "type": "string",
            "description": "Only return referrals from this source."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a referral.",
        "description": "Creates a referral and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/referrals",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "referralSourceId",
              "flag": "referral-source-id",
              "type": "string",
              "nullable": true,
              "description": "Who made the referral."
            },
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "nullable": true,
              "description": "The patient record, once one exists."
            },
            {
              "wire": "patientName",
              "flag": "patient-name",
              "type": "string",
              "required": true,
              "description": "Name of the person referred."
            },
            {
              "wire": "contactPhone",
              "flag": "contact-phone",
              "type": "string",
              "nullable": true,
              "description": "Phone number to reach the person or their family."
            },
            {
              "wire": "contactEmail",
              "flag": "contact-email",
              "type": "string",
              "nullable": true,
              "description": "Email address to reach the person or their family."
            },
            {
              "wire": "referralDate",
              "flag": "referral-date",
              "type": "string",
              "nullable": true,
              "description": "When the referral arrived."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "New",
                "Contacted",
                "AssessmentScheduled",
                "AssessmentCompleted",
                "ServiceAgreementSent",
                "Admitted",
                "Declined",
                "Lost"
              ],
              "nullable": true,
              "description": "Where the referral stands."
            },
            {
              "wire": "estimatedCareNeeds",
              "flag": "estimated-care-needs",
              "type": "string",
              "nullable": true,
              "description": "Care the person is expected to need."
            },
            {
              "wire": "estimatedWeeklyHours",
              "flag": "estimated-weekly-hours",
              "type": "number",
              "nullable": true,
              "description": "Expected hours of care per week."
            },
            {
              "wire": "urgencyLevel",
              "flag": "urgency-level",
              "type": "string",
              "nullable": true,
              "description": "How soon care is needed."
            },
            {
              "wire": "declineReason",
              "flag": "decline-reason",
              "type": "string",
              "nullable": true,
              "description": "Why the referral was declined or lost."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Notes."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a referral.",
        "description": "Returns one referral by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/referrals/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update a referral.",
        "description": "Changes the fields you send and returns the updated referral. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/referrals/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "referralSourceId",
              "flag": "referral-source-id",
              "type": "string",
              "nullable": true,
              "description": "Who made the referral."
            },
            {
              "wire": "patientId",
              "flag": "patient-id",
              "type": "string",
              "nullable": true,
              "description": "The patient record, once one exists."
            },
            {
              "wire": "patientName",
              "flag": "patient-name",
              "type": "string",
              "description": "Name of the person referred."
            },
            {
              "wire": "contactPhone",
              "flag": "contact-phone",
              "type": "string",
              "nullable": true,
              "description": "Phone number to reach the person or their family."
            },
            {
              "wire": "contactEmail",
              "flag": "contact-email",
              "type": "string",
              "nullable": true,
              "description": "Email address to reach the person or their family."
            },
            {
              "wire": "referralDate",
              "flag": "referral-date",
              "type": "string",
              "nullable": true,
              "description": "When the referral arrived."
            },
            {
              "wire": "status",
              "flag": "status",
              "type": "enum",
              "values": [
                "New",
                "Contacted",
                "AssessmentScheduled",
                "AssessmentCompleted",
                "ServiceAgreementSent",
                "Admitted",
                "Declined",
                "Lost"
              ],
              "nullable": true,
              "description": "Where the referral stands."
            },
            {
              "wire": "estimatedCareNeeds",
              "flag": "estimated-care-needs",
              "type": "string",
              "nullable": true,
              "description": "Care the person is expected to need."
            },
            {
              "wire": "estimatedWeeklyHours",
              "flag": "estimated-weekly-hours",
              "type": "number",
              "nullable": true,
              "description": "Expected hours of care per week."
            },
            {
              "wire": "urgencyLevel",
              "flag": "urgency-level",
              "type": "string",
              "nullable": true,
              "description": "How soon care is needed."
            },
            {
              "wire": "declineReason",
              "flag": "decline-reason",
              "type": "string",
              "nullable": true,
              "description": "Why the referral was declined or lost."
            },
            {
              "wire": "notes",
              "flag": "notes",
              "type": "string",
              "nullable": true,
              "description": "Notes."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete a referral.",
        "description": "Deletes a referral. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/referrals/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "invoices",
    "description": "Invoices billed to patients and their families for private-pay care. Read-only.",
    "ops": [
      {
        "action": "list",
        "summary": "List invoices.",
        "description": "Returns a page of invoices. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/invoices",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return invoices for this patient."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Draft",
              "Pending",
              "Processing",
              "Paid",
              "PartiallyPaid",
              "Overdue",
              "Cancelled",
              "Refunded",
              "Failed"
            ],
            "description": "Only return invoices with this status."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an invoice.",
        "description": "Returns one invoice by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/invoices/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  },
  {
    "name": "invoice-line-items",
    "description": "The individual charges on an invoice. Read-only.",
    "ops": [
      {
        "action": "list",
        "summary": "List invoice line items.",
        "description": "Returns a page of invoice line items. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/invoice-line-items",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "invoice_id",
            "flag": "invoice-id",
            "type": "string",
            "description": "Only return lines of this invoice."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an invoice line item.",
        "description": "Returns one invoice line item by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/invoice-line-items/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  },
  {
    "name": "claims",
    "description": "Insurance claims billed to Medicaid, Medicare and other payers, with their adjudication status. Read-only.",
    "ops": [
      {
        "action": "list",
        "summary": "List claims.",
        "description": "Returns a page of claims. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/claims",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "patient_id",
            "flag": "patient-id",
            "type": "string",
            "description": "Only return claims for this patient."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Draft",
              "Validated",
              "ValidationFailed",
              "Submitted",
              "Acknowledged",
              "Accepted",
              "Rejected",
              "InAdjudication",
              "Paid",
              "PartiallyPaid",
              "Denied",
              "Appealed",
              "Voided"
            ],
            "description": "Only return claims with this status."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a claim.",
        "description": "Returns one claim by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/claims/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  },
  {
    "name": "payroll-entries",
    "description": "One caregiver's hours and pay for one pay period. Read-only.",
    "ops": [
      {
        "action": "list",
        "summary": "List payroll entries.",
        "description": "Returns a page of payroll entries. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/payroll-entries",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "caregiver_id",
            "flag": "caregiver-id",
            "type": "string",
            "description": "Only return entries for this caregiver."
          },
          {
            "wire": "status",
            "flag": "status",
            "type": "enum",
            "values": [
              "Pending",
              "Approved",
              "Processed",
              "Paid",
              "Cancelled",
              "Failed",
              "HoursSubmitted",
              "CheckCreated",
              "PaidConfirmed",
              "PaidExternally",
              "Voided"
            ],
            "description": "Only return entries with this status."
          },
          {
            "wire": "pay_period_start",
            "flag": "pay-period-start",
            "type": "string",
            "description": "Only return entries for the pay period starting on this date."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a payroll entry.",
        "description": "Returns one payroll entry by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/payroll-entries/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  },
  {
    "name": "conversations",
    "description": "In-app message threads between people at your agency: one-to-one chats and named group chats. Read-only; start conversations in AveeCare.",
    "ops": [
      {
        "action": "list",
        "summary": "List conversations.",
        "description": "Returns a page of conversations. Filters combine with AND. Use `next_cursor` to fetch the next page.",
        "method": "GET",
        "path": "/v1/conversations",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a conversation.",
        "description": "Returns one conversation by ID.",
        "method": "GET",
        "path": "/v1/conversations/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  },
  {
    "name": "messages",
    "description": "Messages in a conversation. Messages you send through the API are sent as the API key's user.",
    "ops": [
      {
        "action": "list",
        "summary": "List messages.",
        "description": "Returns a page of messages. Filters combine with AND. Use `next_cursor` to fetch the next page.",
        "method": "GET",
        "path": "/v1/messages",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "conversation_id",
            "flag": "conversation-id",
            "type": "string",
            "required": true,
            "description": "The conversation to list messages from."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create a message.",
        "description": "Creates a message and returns it. Send an `Idempotency-Key` header to make the request safe to retry. With a caregiver's or patient's key, a saved record that key cannot read back is answered with only `object` and `id`. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/messages",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "conversationId",
              "flag": "conversation-id",
              "type": "string",
              "required": true,
              "description": "The conversation the message belongs to."
            },
            {
              "wire": "content",
              "flag": "content",
              "type": "string",
              "required": true,
              "description": "Message text."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve a message.",
        "description": "Returns one message by ID.",
        "method": "GET",
        "path": "/v1/messages/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  },
  {
    "name": "alerts",
    "description": "Alerts on your agency's alert board, such as a credential about to expire or a missed clock-in, and announcements staff post for caregivers.",
    "ops": [
      {
        "action": "list",
        "summary": "List alerts.",
        "description": "Returns a page of alerts. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/alerts",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "type",
            "flag": "type",
            "type": "enum",
            "values": [
              "Critical",
              "Important",
              "Notice"
            ],
            "description": "Only return alerts of this type."
          },
          {
            "wire": "audience",
            "flag": "audience",
            "type": "enum",
            "values": [
              "CompanyWide",
              "StaffOnly",
              "CaregiversAll",
              "PatientsAll",
              "Caregiver",
              "Patient",
              "Visit",
              "PatientCareTeam"
            ],
            "description": "Only return alerts for this audience."
          },
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an alert.",
        "description": "Creates an alert and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/alerts",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "Headline."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "Details."
            },
            {
              "wire": "type",
              "flag": "type",
              "type": "enum",
              "values": [
                "Critical",
                "Important",
                "Notice"
              ],
              "nullable": true,
              "description": "How prominently the alert is shown."
            },
            {
              "wire": "audience",
              "flag": "audience",
              "type": "enum",
              "values": [
                "CompanyWide",
                "StaffOnly",
                "CaregiversAll",
                "PatientsAll",
                "Caregiver",
                "Patient",
                "Visit",
                "PatientCareTeam"
              ],
              "nullable": true,
              "description": "Who sees the alert. `Caregiver`, `Patient`, `Visit` and `PatientCareTeam` need `audienceTargetId`."
            },
            {
              "wire": "audienceTargetId",
              "flag": "audience-target-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver, patient or visit the alert is for, when the audience names one."
            },
            {
              "wire": "time",
              "flag": "time",
              "type": "string",
              "nullable": true,
              "description": "When the alert takes effect."
            },
            {
              "wire": "reviewDate",
              "flag": "review-date",
              "type": "string",
              "nullable": true,
              "description": "When the alert should be reviewed or cleared."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an alert.",
        "description": "Returns one alert by ID. Available to keys belonging to office staff and caregivers.",
        "method": "GET",
        "path": "/v1/alerts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an alert.",
        "description": "Changes the fields you send and returns the updated alert. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/alerts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "Headline."
            },
            {
              "wire": "description",
              "flag": "description",
              "type": "string",
              "nullable": true,
              "description": "Details."
            },
            {
              "wire": "type",
              "flag": "type",
              "type": "enum",
              "values": [
                "Critical",
                "Important",
                "Notice"
              ],
              "nullable": true,
              "description": "How prominently the alert is shown."
            },
            {
              "wire": "audience",
              "flag": "audience",
              "type": "enum",
              "values": [
                "CompanyWide",
                "StaffOnly",
                "CaregiversAll",
                "PatientsAll",
                "Caregiver",
                "Patient",
                "Visit",
                "PatientCareTeam"
              ],
              "nullable": true,
              "description": "Who sees the alert. `Caregiver`, `Patient`, `Visit` and `PatientCareTeam` need `audienceTargetId`."
            },
            {
              "wire": "audienceTargetId",
              "flag": "audience-target-id",
              "type": "string",
              "nullable": true,
              "description": "The caregiver, patient or visit the alert is for, when the audience names one."
            },
            {
              "wire": "reviewDate",
              "flag": "review-date",
              "type": "string",
              "nullable": true,
              "description": "When the alert should be reviewed or cleared."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an alert.",
        "description": "Deletes an alert. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/alerts/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "offices",
    "description": "Your agency's offices (branches). Patients, caregivers and applicants can each belong to one office. There is always exactly one default office.",
    "ops": [
      {
        "action": "list",
        "summary": "List offices.",
        "description": "Returns a page of offices. Filters combine with AND. Use `next_cursor` to fetch the next page. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/offices",
        "pathParams": [],
        "kind": "list",
        "scope": "read",
        "query": [
          {
            "wire": "created_after",
            "flag": "created-after",
            "type": "string",
            "description": "Only return objects created after this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "created_before",
            "flag": "created-before",
            "type": "string",
            "description": "Only return objects created before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "updated_after",
            "flag": "updated-after",
            "type": "string",
            "description": "Only return objects last changed after this time (exclusive). ISO 8601 with a time zone. Use it for incremental sync: pass the newest `updatedAt` you already have."
          },
          {
            "wire": "updated_before",
            "flag": "updated-before",
            "type": "string",
            "description": "Only return objects last changed before this time (exclusive). ISO 8601 with a time zone."
          },
          {
            "wire": "limit",
            "flag": "limit",
            "type": "integer",
            "description": "Number of objects to return, from 1 to 100."
          },
          {
            "wire": "cursor",
            "flag": "cursor",
            "type": "string",
            "description": "The `next_cursor` from the previous page. Send the same filters with it."
          }
        ]
      },
      {
        "action": "create",
        "summary": "Create an office.",
        "description": "Creates an office and returns it. Send an `Idempotency-Key` header to make the request safe to retry. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "POST",
        "path": "/v1/offices",
        "pathParams": [],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "required": true,
              "description": "Office name."
            },
            {
              "wire": "address",
              "flag": "address",
              "type": "string",
              "nullable": true,
              "description": "Street address."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code."
            },
            {
              "wire": "phone",
              "flag": "phone",
              "type": "string",
              "nullable": true,
              "description": "Main phone number."
            },
            {
              "wire": "isDefault",
              "flag": "is-default",
              "type": "boolean",
              "nullable": true,
              "description": "Whether this is the default office. Making another office the default clears this one."
            }
          ]
        }
      },
      {
        "action": "retrieve",
        "summary": "Retrieve an office.",
        "description": "Returns one office by ID. Available to keys belonging to office staff.",
        "method": "GET",
        "path": "/v1/offices/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "read",
        "query": []
      },
      {
        "action": "update",
        "summary": "Update an office.",
        "description": "Changes the fields you send and returns the updated office. Send `null` to clear an optional field. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "PATCH",
        "path": "/v1/offices/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": [],
        "body": {
          "required": true,
          "fields": [
            {
              "wire": "name",
              "flag": "name",
              "type": "string",
              "description": "Office name."
            },
            {
              "wire": "address",
              "flag": "address",
              "type": "string",
              "nullable": true,
              "description": "Street address."
            },
            {
              "wire": "city",
              "flag": "city",
              "type": "string",
              "nullable": true,
              "description": "City."
            },
            {
              "wire": "state",
              "flag": "state",
              "type": "string",
              "nullable": true,
              "description": "State, as a two-letter code."
            },
            {
              "wire": "zipCode",
              "flag": "zip-code",
              "type": "string",
              "nullable": true,
              "description": "ZIP code."
            },
            {
              "wire": "phone",
              "flag": "phone",
              "type": "string",
              "nullable": true,
              "description": "Main phone number."
            },
            {
              "wire": "isDefault",
              "flag": "is-default",
              "type": "boolean",
              "nullable": true,
              "description": "Whether this is the default office. Making another office the default clears this one."
            }
          ]
        }
      },
      {
        "action": "delete",
        "summary": "Delete an office.",
        "description": "Deletes an office. The default office, and an agency's only office, cannot be deleted. Available to keys belonging to office staff. Requires a key with `write` scope.",
        "method": "DELETE",
        "path": "/v1/offices/{id}",
        "pathParams": [
          "id"
        ],
        "kind": "object",
        "scope": "write",
        "query": []
      }
    ]
  },
  {
    "name": "me",
    "description": "The API key making the request: its scopes, its user's role and its agency.",
    "ops": [
      {
        "action": "retrieve",
        "summary": "Retrieve the current API key.",
        "description": "Returns the API key making the request, its scopes, the role of the user it belongs to, and its agency. Useful to check a key works.",
        "method": "GET",
        "path": "/v1/me",
        "pathParams": [],
        "kind": "object",
        "scope": "read",
        "query": []
      }
    ]
  }
];
