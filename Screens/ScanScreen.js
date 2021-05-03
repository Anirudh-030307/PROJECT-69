import React from 'react';
import { Text, View, TouchableOpacity,Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state={
          hasCameraPermissions:null,
          Scanned:false,
          ScannedData:'',
          ButtonState:'normal',
        }
      }
      GetCameraPermissions= async ()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
          hasCameraPermissions:status==="granted",
          ButtonState:'clicked',
          Scanned:false,
        })
      }
      HandleBarCodeScanner=async ({type,data})=>{
        this.setState({
          Scanned:true,
          ScannedData:data,
          ButtonState:'normal',
        })
      }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState === "clicked" && hasCameraPermissions===true){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.HandleBarCodeScanner}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else {
        return(
          <View style={styles.container}>
              <Image
                source={require("../assets/CAMERA.jpg")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>BARCODE SCANNER</Text>
          <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"}</Text>     
          <TouchableOpacity
            onPress={this.GetCameraPermissions}
            style= {styles.scanButton} 
            title = "Bar Code Scanner">
            <Text style={styles.buttonText}>SCAN QR CODE</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline',
      fontfamily: 'Times New Roman'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
      borderRadius: 20,
    },
    buttonText:{
      fontSize: 20,
      fontWeight: 'bold'
    }
  });