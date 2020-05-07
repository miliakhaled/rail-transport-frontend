import gql from "graphql-tag";

export const ALL_CONTACTS = gql`
  query fetchContacts(
    $nom: String
    $prenom: String
    $phone: String
    $email: String
    $client: ID
    $limit: Int
    $offset: Int
  ) {
    response: all_contacts(
      nom__icontains: $nom
      prenom__icontains: $prenom
      email__icontains: $email
      phone__icontains: $phone
      client: $client
    ) {
      results(limit: $limit, offset: $offset) {
        id
        nom
        prenom
        fonction
        email
        phone
        client {
          raison_social
          id
        }
      }
      totalCount
    }
  }
`;
