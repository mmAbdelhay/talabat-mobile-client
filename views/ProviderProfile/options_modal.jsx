import React, { useState } from "react";
import { Button, Text, View, CheckBox } from "react-native";
import Modal from "react-native-modal";
import { RadioButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import SelectMultiple from "react-native-select-multiple";
import { addToCart, defineProviderID } from "../../services/cartSlice";

function ModalTester(props) {
   const [isModalVisible, setModalVisible] = useState(false);
   const [itemOptions, setItemOptions] = useState();
   const [value, setValue] = React.useState("first");
   const dispatch = useDispatch();

   const [additionalOptions, setAdditionalOptions] = useState({});
   const toggleModal = () => {
      setModalVisible(!isModalVisible);
   };

   const handleOk = () => {
      saveDispatcherState();
      setModalVisible(!isModalVisible);
   };

   const checkBoxHandler = (event) => {
      //    const optionsArray = event.target.value.split("_");
      //    console.log(event);
      //    if (event.target.checked) {
      //       setAdditionalOptions({
      //          ...additionalOptions,
      //          [optionsArray[0]]: {
      //             name: optionsArray[0],
      //             price: optionsArray[1] ? optionsArray[1] : 0,
      //          },
      //       });
      //    } else {
      //       for (let checked of Object.values(additionalOptions)) {
      //          if (checked["name"] === optionsArray[0]) delete additionalOptions[optionsArray[0]];
      //       }
      //    }
      //    console.log("CHECKBOXES", additionalOptions);
   };
   const radioButtonHandler = (option) => {
      const optionsArray = option.split("_");
      setValue(option);
      setAdditionalOptions({
         ...additionalOptions,
         [optionsArray[2]]: {
            name: optionsArray[0],
            price: optionsArray[1] ? optionsArray[1] : 0,
         },
      });
      console.log("RadioButtons", additionalOptions);
   };
   //    console.log("PROPS", props.providerId);

   const uuidv4 = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
         var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
         return v.toString(16);
      });
   };
   const saveDispatcherState = () => {
      let total_price = +props.item.price;
      let additional_string = "";
      console.log(additionalOptions);
      for (let additionalEntry of Object.values(additionalOptions)) {
         let additional = parseFloat(additionalEntry["price"])
            ? parseFloat(additionalEntry["price"])
            : 0;
         total_price = total_price + additional;

         additional_string += additionalEntry["name"] + " ";
      }
      const itemToBeSaved = {
         name: props.item.name,
         id: uuidv4(),
         item_id: props.item.id,
         quantity: 1,
         price: total_price,
         additional: additional_string,
      };
      console.log("ADDITIONAL STRING", additional_string);
      dispatch(defineProviderID(props?.providerId));
      dispatch(addToCart(itemToBeSaved));
   };

   return (
      <View style={{ flex: 1 }}>
         <Button title="Options" onPress={toggleModal} />

         <Modal isVisible={isModalVisible} backdropColor="white">
            <View style={{ flex: 1 }}>
               {props.item.Item_Options.map((section) => {
                  return section.section_type === "RadioButton" ? (
                     <>
                        <Text>{section.section_name}</Text>
                        {section.Additional_Options.map((option) => {
                           return (
                              <>
                                 <RadioButton.Group
                                    onValueChange={(newValue) => radioButtonHandler(newValue)}
                                    value={value}>
                                    <View>
                                       <Text>
                                          {" "}
                                          {option.option_name}
                                          {option.additional_price
                                             ? `(+${option.additional_price})`
                                             : ``}
                                       </Text>
                                       <RadioButton
                                          value={
                                             option.option_name +
                                             "_" +
                                             option.additional_price +
                                             "_" +
                                             option.item_option_id
                                          }
                                       />
                                    </View>
                                 </RadioButton.Group>
                              </>
                           );
                        })}
                     </>
                  ) : (
                     <>
                        <Text>{section.section_name}</Text>
                        {section.Additional_Options.map((option) => {
                           return (
                              <>
                                 <Text>
                                    {" "}
                                    {option.option_name}
                                    {option.additional_price ? `(+${option.additional_price})` : ``}
                                 </Text>
                                 <CheckBox onChange={() => checkBoxHandler()} />
                              </>
                           );
                        })}
                     </>
                  );
               })}

               <Button title="Hide modal" onPress={toggleModal} />
               <Button title="Add to cart" onPress={handleOk} />
            </View>
         </Modal>
      </View>
   );
}

export default ModalTester;
