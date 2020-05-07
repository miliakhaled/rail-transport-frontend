import gql from "graphql-tag";

export const FETCH_CLIENTS = gql`
  query fetchClients(
    $raison_social: String
    $code_client: String
    $limit: Int
    $offset: Int
  ) {
    response: all_clients(
      raison_social__icontains: $raison_social
      code_client__icontains: $code_client
    ) {
      results(limit: $limit, offset: $offset) {
        id
        raison_social
        code_client
        address
        email
        phone
        # barem {
        #   designation
        #   id
        # }
        contacts {
          nom
          prenom
          fonction
          email
          phone
        }
      }
      totalCount
    }
  }
`;
