import _ from "lodash";
import {
  SelectType,
  MultipleType,
  InputFieldType,
  InputUnionType,
} from "../types/FilterTypes";
/**
 * Extract the foreignkey from a nested foreign object ex:
 * ```js
 * {nom:"milia",client:{id:1,raison_social:"mobilis"}} => {nom:"milia", client:1}
 * ```
 * @param {array} fields represent fields that contain information about input, we target the query field if exists
 * @param {array} values the array contains the values
 *
 */
/**
 * this function extract the foreign keys from foreign array ex: prestations in bareme
 * and return the same list, with foreign key ID instead of an object
 * @param {array} fields list of fields of nested input
 * @param {array} values list of values of the prefetched object
 * @returns same array with foreign keys extracted
 */
const extractNestedFieldKeys = (fields: any, initialValues = []) => {
  let res: any = [];

  initialValues.forEach((f) => {
    //console.log(f);

    const sub = fields.reduce((acc: any, cur: any) => {
      return {
        ...acc,
        [cur.field]: _.get(f, cur.properties.get, f[cur.name]),
      };
    }, {});
    res.push(sub);
  });
  return res;
};

/**
 * replace foreign objects with the ID
 * @param {array} fields input fields
 * @param {array} values object values
 */
export const extractForeignKey = (
  fields: InputFieldType<InputUnionType>[] = [],
  values: any
) => {
  let res = {};
  const multiple_fields = fields.filter(
    (f) => f.properties.type === "multiple"
  );

  //const multiple_values = values[multiple_fields.field];

  res = {
    ...res,
    ...fields
      .filter((f) => !(f.properties.type === "multiple"))
      .reduce(
        (acc, cur) => ({
          ...acc,
          [cur.name]:
            (cur.properties as SelectType).mode === "multiple"
              ? _.get(values, cur.name, []).map((f: any) => _.get(f, "id", []))
              : _.get(
                  values,
                  (cur.properties as SelectType).get + "",
                  values[cur.name]
                ),
        }),
        {}
      ),
  };

  multiple_fields.forEach((f) => {
    res = {
      ...res,
      [f.name]: [
        ...extractNestedFieldKeys(
          (f.properties as MultipleType).fields,
          values[f.name]
        ),
      ],
    };
  });

  return res;
};
