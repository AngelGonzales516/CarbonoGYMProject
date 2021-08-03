
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");
const dataStyle = {
  marginTop: height * 0.02,
  width: width * 0.6,
  backgroundColor: "#2f3640",
  borderRadius: width * 0.04
}
const dataStyle2 = {
  marginTop: height * 0.02,
  width: width * 0.6,
  backgroundColor: "#2f3640",
  borderRadius: width * 0.04
}

const dataTitleStyle = {
  color: "#2f3640"
}

const dataTitleStyle2 = {
  color: "#2f3640"
}

export default data = {
  dataStyle,
  dataStyle2,
  dataTitleStyle,
  dataTitleStyle2
}