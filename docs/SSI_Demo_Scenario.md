# Demo: SSI Scenario

The W3C standards and especially the DID methods leave plenty of opportunities to prove identities and are the framework we operate in. But for a demonstration purpose, we would like to write down a specific SSI scenario that complements the Sensor Model Tokenization Demo. Through this scenario, the existing demo should be extended by the hereby defined roles.

## Assumption

- Tezos is AN accepted registry
- We use the public test network "ithacanet" or a fork of the mainnet-> we need to be able to set that up on a new testnetwork quickly
- We need an initial setup, known private keys of e.g. BMW, Conti, and ASC(S e.V. of the "issuers" (e.g., they should already hold dids registered on Tezos)
- Issuers are registered in a "Trusted Issuer Registry" like Gaia-X Registry (service providers would require the issuer of a vc to be listed in the registry)

## Roles

- Alice: Manager of a specific "Data Space" which is the "ENVITED"
- Bob: BMW employee who wants to have access to a Sensor Model in the "ENVITED" data space
- Charles: A Continental employee who wants to tokenize a Sensor Model and is responsible to make it available TO BMW through "ENVITED"(upload, etc) -> connecting part to the other Sensor Model Tokenization Demo
- Dave: BWM Line Manger of Bob who can issue Bobs credentials for the self-attestation
- Emmy: Is the trust anchor

## Scenario

1. He received a BMW email address with a "bmw.de" domain and wants to associate his PKH with this email
2. He has a role and some additional information about himself he testifies (Name, Surname, Role, Department, Company)
3. He wants to get a vc from BMW which confirms that he is a BMW employee (stores the vc in his identity wallet)
4. He presents his VC to "ENVITED" and Alice does the verification (i.e. checks if the issuer (did) is listed in trust anchor, checks Bob's did, checks the claims in the vc)

# Open Questions

- The issuer could auto-check self-attestation claims like "is the company name part of the email domain" when issuing a vc -> Future
- What about circular dependencies?! Registries?
- How to verify an email (Registering a did)?
- BMW is not an attribute but rather an identity represented by a did in the VC
- What is the "initialization procedure"

# Step by step

1. Create a trusted registry OR use an existing one (Tezos Smart Contract or the blockchain - what is meant here???)
2. We now have the FIRST VC
3. BMW NEEDS to register first and ASC(S e.V. as well, maybe through domain ownership - which DID method should we choose here?

- register
- claim (fields)
- present the claim
