use crate::SPRUCE_DIDWEB;
use anyhow::{anyhow, Result};
use chrono::{SecondsFormat, Utc};
use serde::Deserialize;
use serde_json::json;
use ssi::{blakesig::hash_public_key, jwk::JWK, vc::Credential};
use url::Url;
use uuid::Uuid;

#[derive(Deserialize, Debug)]
pub struct DnsResponse {
    #[serde(rename = "Answer")]
    pub answer: Vec<AnswerResponse>,
}

#[derive(Deserialize, Debug)]
pub struct AnswerResponse {
    pub name: String,
    pub data: String,
}

// pub fn find_signature_to_resolve(dns_result: DnsResponse) -> Result<String> {
//     for answer in dns_result.answer {
//         let mut trimmed_signature: &str = &answer.data;
//         if trimmed_signature.starts_with('"') && trimmed_signature.ends_with('"') {
//             trimmed_signature = &answer.data[1..answer.data.len() - 1];
//         }
//         if trimmed_signature.starts_with("tzprofiles-verification") {
//             return Ok(trimmed_signature.to_string());
//         }
//     }

//     return Err(anyhow!("Signature not found"));
// }

// }

// pub async fn retrieve_txt_records(domain: String) -> Result<DnsResponse> {
//     let client = reqwest::Client::new();
//     let request_url = format!(
//         "https://cloudflare-dns.com/dns-query?name={}&type=txt",
//         domain
//     );

//     let res = client
//         .get(Url::parse(&request_url)?)
//         .header("accept", "application/dns-json")
//         .send()
//         .await?
//         .json()
//         .await?;

//     Ok(res)
// }

pub fn build_email_vc(pk: &JWK, email: &str) -> Result<Credential> {
    Ok(serde_json::from_value(json!({
      "@context": [
          "https://www.w3.org/2018/credentials/v1",
          {
              "sameAs": "http://schema.org/sameAs",
              "EmailVerification": "https://tzprofiles.com/EmailVerification",
              "EmailVerificationMessage": {
                  "@id": "https://tzprofiles.com/EmailVerificationMessage",
                  "@context": {
                      "@version": 1.1,
                      "@protected": true,
                      "timestamp": {
                          "@id": "https://tzprofiles.com/timestamp",
                          "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
                      }
                  }
              }
          }
      ],
      "issuanceDate": Utc::now().to_rfc3339_opts(SecondsFormat::Millis, true),
      "id": format!("urn:uuid:{}", Uuid::new_v4().to_string()),
      "type": ["VerifiableCredential", "EmailVerification"],
      "credentialSubject": {
          "id": format!("did:pkh:tz:{}", &hash_public_key(pk)?),
          "sameAs": format!("email:{}", email)
      },
      "issuer": SPRUCE_DIDWEB
    }))?)
}
