import React from 'react'
import { Avatar, Card, Typography } from 'antd'
import Title from 'antd/lib/typography/Title'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _ from 'lodash'

export default function Profile() {
    const { data } = useQuery(gql`
    query getMe{
      me {
        first_name,
        last_name,
    profile {
      photo
      job
    }
  }
    }
  `)
   
  
    return (
        <div style={{width:"100%",height:200,display:"flex",justifyContent:"center",flexDirection:"row"}}>
        <Card bordered={false}  style={{backgroundColor:"transparent",textAlign:"center"}}>
            <Avatar  size="large"  src={`http://${window.location.hostname}:8000/${_.get(data, 'me.profile.photo', '')}`} />
            <br/>
            <Typography  type="danger" style={{color:"white",textAlign:"center"}} level={4} >{_.get(data, 'me.first_name', '')} {_.get(data, 'me.last_name', '')}</Typography>
        </Card>
      </div>
    )
}
