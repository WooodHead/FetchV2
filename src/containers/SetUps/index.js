import React from 'react';
import { gql, graphql, withApollo } from 'react-apollo';
import { Layout } from "antd";
import PageHeader from '../../components/utility/pageHeader';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import IntlMessages from '../../components/utility/intlMessages';
import PendingSetUpList from '../../components/setUps/pendingSetUpList'
import SetUpsMap from '../../components/maps/setUps/setUpMap';

const { Sider, Content } = Layout;

class SetUpService extends React.Component {
  
//   render() {
//     console.log(this.props)
//     if (this.props.SetUps && this.props.SetUps.loading) { return (<div>Loading...</div>)}
//     console.log(this.props.SetUps.error)
//     if (this.props.SetUps && this.props.SetUps.error) { return (<div>Error...</div>)}
    
//       const {
//         allSetUpServices
//       } = this.props.SetUps
//     return(
//       <LayoutWrapper className="isomorphicSetUps" style={{ background: "none" }}>
//         <PageHeader><IntlMessages id="setUpPage.index" /></PageHeader>
//             <Sider width="300" className="isoSetUpListBar" >
//               <PendingSetUpList
//                 setUps={allSetUpServices}
//               />
//             </Sider>
//           <Content>
//             <SetUpsMap 
//               allSetUps={allSetUpServices}
//             />
//           </Content>
//       </LayoutWrapper>    
//     )
//   }
// }
render() {
  console.log(this.props)
  if (this.props.SetUps && this.props.SetUps.loading) { return (<div>Loading...</div>)}
  console.log(this.props.SetUps.error)
  if (this.props.SetUps && this.props.SetUps.error) { return (<div>Error...</div>)}
  
    const {
      allOilAccountStates
    } = this.props.SetUps
  return(
    <LayoutWrapper className="isomorphicSetUps" style={{ background: "none" }}>
      <PageHeader><IntlMessages id="setUpPage.index" /></PageHeader>
        <Sider width="300" className="isoSetUpListBar" >
          <PendingSetUpList
            setUps={allOilAccountStates}
          />
        </Sider>
      {allOilAccountStates && allOilAccountStates.length > 0
        ? <Content className="isoSetUpBox">
            <SetUpsMap 
              allSetUps={allOilAccountStates}
            />
          </Content> 
        : <Content>
              <div><h4>There are not any Set Ups Pending at this time....</h4></div>
          </Content>}
    </LayoutWrapper>    
  )
}
}

const SetUpServiceQuery = gql`
query Setups {
  allOilAccountStates(filter: {
    setup: false
    }) {
      id
      oilService{
        id
        containment{
          id
          type
          quantity
        }
        service{
          id
          setUpService{
            id
            setUpDate
            setUpNotes{
              setUpNoteContent
            }
          }
          location{
            id
            locationName
            street
            city
            state
            zip
            lat
            lng
          }
        }
      }
    }
  }
`

// const SetUpServiceQuery = gql`
// query SetUps{
//   allSetUpServices(orderBy: setUpDate_DESC){
//     id
//     setUpDate
//     setUpNotes{
//       id
//       setUpNoteContent
//     }
// 		service{
//       id
//       location{
//         id
//         locationName
//         street
//         city
//         state
//         zip
//         lat
//         lng
//       }
//       oilService{
//         id
//         cycle
//         pickUpType
//         containment{
//           id
//           type
//           quantity
//           size
//         }
//         oilAccountState(filter: {
//           setup: true
//         }) {
//           id
//         }
//       }
//     }
//   }
// }
// `;

const SetUpServiceIndexPageWithData = withApollo(graphql(SetUpServiceQuery, {
  name: 'SetUps',
  options: {
    fetchPolicy: 'network-only'
  },
})(SetUpService));

export default SetUpServiceIndexPageWithData

