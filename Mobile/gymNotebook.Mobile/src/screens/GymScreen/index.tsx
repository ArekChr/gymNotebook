import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../styles/colors'
import { NavigationScreenProp } from 'react-navigation'
import H1 from '../../components/Headings/H1'
import MuscleModelComponent from '../../components/MuscleModel'

interface Props {
  navigation: NavigationScreenProp<GymScreen>
}

export default class GymScreen extends Component<Props> {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }: any) => <Icon name='dumbbell' size={29} color={tintColor} />,
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.primaryDark, padding: 8 }}>
        <H1>Workouts</H1>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('AddTrainingScreen')}
          style={{ marginLeft: 'auto', paddingRight: 5, paddingLeft: 5, paddingTop: 4 }}
        >
          <MaterialIcons name='add-circle' size={45} color={Colors.secondary} />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.secondary,
            borderBottomColor: Colors.secondary,
            borderBottomWidth: 1,
            padding: 10,
            paddingTop: 0,
          }}
        >
          OSTATNIE ĆWICZENIA
        </Text>
        <View style={{ backgroundColor: Colors.primaryLight, marginTop: 10, borderRadius: 10, padding: 5 }}>
          <Text style={{ color: Colors.fontSecondary, margin: 5 }}>Wczoraj</Text>
          <Text style={{ color: Colors.fontDark, margin: 5, fontSize: 15 }}>
            Uginanie sztangi łamanej stojąc: 4x10x12kg
          </Text>
          <Text style={{ color: Colors.fontDark, margin: 5, fontSize: 15 }}>
            Uginanie sztangi na modlitewniku: 3x12x10kg
          </Text>
          <Text style={{ color: Colors.fontDark, margin: 5, fontSize: 15 }}>
            Wyciskanie sztangi na ławce płaskiej: 5x5x100kg
          </Text>
          <Text style={{ color: Colors.fontDark, margin: 5, fontSize: 15 }}>Wiosłowanie hantli: 5x5x45kg</Text>
          <Text style={{ color: Colors.fontDark, margin: 5, fontSize: 15 }}>Allahy: 5x5x20j.</Text>
        </View>
      </View>
    )
  }
}
