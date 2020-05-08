import os


def createApp(path):
    access_rights = 0o755

    # try:
    os.makedirs(path, access_rights)
    os.makedirs(f"{path}/graphql", access_rights)
    queries = open(f"{path}/graphql/queries.ts", "a+")
    queries.write('import gql from "graphql-tag";\n')
    queries.close()
    mutations = open(f"{path}/graphql/mutations.ts", "a+")
    mutations.write('import gql from "graphql-tag";\n')
    mutations.close()

    
    #open(f"{path}/utils.ts", "a+").close()

    # except:
    # print("Creation of the directory %s failed" % path)
    # else:
    # print("created succefully")

def createInfo(path,name):
    info = open(f"{path}/info.ts", "a+")
    info.writelines(['import { ColumnsType } from "antd/lib/table";\n',
    'import { FieldType, FormInputType } from "../../lib/form/types";\n'])
    info.writelines([f'export const {name}Columns: ColumnsType = [];\n',
f'export const {name}Inputs: FormInputType = {{ title: "", fields: [], info: "" }};\n',
f'export const {name}Filters: FieldType[] = [];\n'])


def createComponent(path):
    create = open(f"{path}/create.tsx", "a+")
    create.writelines(["import React, { ReactElement } from 'react';\n",
                       'import GraphQLForm from "../../lib/form/GraphQLForm";\n', 
                       'import { createMutation } from "../../lib/utils";\n'
                       'import { browserHistory } from "../../config";\n',
                        f'import {{{name}Inputs as inputs}} from "./info"\n'

                       ])
    create.writelines(['interface Props {}\n',

                       'export default function create({}: Props): ReactElement {\n',
                       'return (\n',
                       '<GraphQLForm\n',
                       'title=""\n',
                       'span={12}\n',
                       'history={browserHistory}\n',
                       'inputs={inputs}\n',
                       'initialValues={{}}\n',
                       'mutation={createMutation("create_nested_client","CreateClientInput!" )}\n',
                       '/>\n',
                       '  );\n',
                       '}\n'])
    create.close()


def listComponent(path,name):
    view = open(f"{path}/list.tsx", "a+")
    view.writelines(['import React, { ReactElement } from "react";\n',
                    f'import {{{name}Columns as columns}} from "./info"\n',
                    f'import {{{name}Filters as filters}} from "./info"\n',
                    'import { browserHistory } from "../../config";\n',
                     'import GraphQLTableView from "../../lib/views/GraphQLTableView";\n', 
                     'import { deleteMutation,createMutation } from "../../lib/utils";\n'])
    view.writelines(['interface Props {}\n', 'export default function list({}: Props): ReactElement {\n', '  return (\n',
                     '<div>\n',
                     ' <GraphQLTableView\n',
                     ' columns={columns}\n',
                     'filters={filters}\n',
                     'createLink=""\n',
                     'actions={[]}\n',
                     'initVariables={{}}\n',
                     'deleteColumn={false}\n',
                     'updateColumn={false}\n',
                     'history={browserHistory}\n',
                     'graphql={{\n'
                     'all:"" ,\n'
                     'delete: deleteMutation(""),\n'
                     ' update: createMutation("", ""),\n'
                     ' }}\n'
                     '/>\n'
                     ' </div>\n'
                     ');}\n'])
    view.close()


def createIndex(path, name):

    index = open(f"{path}/index.tsx", "a+")
    index.writelines([
        'export {{ default as {0}List }} from "./list"\n'.format(
            name.capitalize()),
        'export {{ default as {0}Create }} from "./create"\n'.format(
            name.capitalize()),
    ])


current_path = os.getcwd()
name = input('app name : ')
path = f"{current_path}/src/apps/{name}"
createApp(path)
listComponent(path,name)
createComponent(path)
createIndex(path, name)
createInfo(path,name)
