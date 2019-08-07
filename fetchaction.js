import React, { Component } from 'react';
import { View,Text,ScrollView} from 'react-native';
import  {connect}  from 'react-redux';
import { fetchdata} from './redux/app-redux';
import CoinCard from './CoinCard'
import Spinner from 'react-native-loading-spinner-overlay';


const mapStateToProps = (state) => {
    return {
      crypto: state.crypto
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return { fetchdata: (crypto) => { dispatch(fetchdata(crypto)) }}
  };

  
  class Fetchaction extends  React.Component {

    constructor(props){
        super(props)
        this.state = {
          crypto: [],
          
       };
    }
    componentDidMount(){
      this.fetchcrypto()
    }
      fetchcrypto = () => {      /// start fetching data

        var OBJECT = {  
          method: 'GET',
          headers: {
            'X-CMC_PRO_API_KEY': 'a0053bc5-9f90-4906-902d-e2fd25855adb'
          } }
         var that=this;
        fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', OBJECT)  
       .then(function(res) {
                 return  res.json();
                  })
        .then(function(resJson) {
              console.log(resJson.data[0])
            
             that.setState({crypto:resJson.data},function(){
               
              that.props.fetchdata(that.state.crypto) 
              for(var i=0;i<resJson.data.length;i++){
            
              }
             })   
        })
        .catch(err => console.log(err))
       
                    }            /// end of fetchcrypto

  render() {
    const { contentContainer } = styles;
    if(this.props.crypto.length!==0){
      
    return (
      <ScrollView contentContainerStyle={contentContainer}>
     { this.props.crypto.map((coin) =>
    <CoinCard
      key={coin.name}
      coin_name={coin.name}
      symbol={coin.symbol}
      price_usd={coin.quote.USD.price}
      percent_change_24h={coin.quote.USD.percent_change_24h}
      percent_change_7d={coin.quote.USD.percent_change_7d}
    />
      )}
     </ScrollView>  
            )  }
                                 /// else if the array still empty return the Spinner
            return (
              <View>
              <Spinner
            visible={this.props.crypto.length===0}
            textConent='Loading...'
            textStyle={{color: 'green'}}
            animation='fade'
          />
        </View>
            )       
   
  }
}                                /// end of class 

export default connect(mapStateToProps, mapDispatchToProps)(Fetchaction);

const styles = {
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 50
  }
}

