import gql from "graphql-tag";

export const ALL_ENGINES = gql`
  query ALL_ENGINES($limit: Int, $offset: Int) {
    response: all_engines {
      results(limit: $limit, offset: $offset) {
        id
        marque
        matricule
        model {
          designation
        }
        nature
        year
      }
    }
  }
`;
