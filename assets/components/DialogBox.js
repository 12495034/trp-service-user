import React, { useState } from "react";
import { ScrollView, View } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';

const DialogBox = (props) => {
  console.log("Dialog box displayed")
  return (
    <Provider>
        <Portal>
          <Dialog visible={props.visible} onDismiss={props.hideDialog}>
            <Dialog.Title>{props.title}</Dialog.Title>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{paddingHorizontal: 0}}>
                  {/* see content file for data passed into dialog */}
                  {props.content}
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button color="green" onPress={() => {
                props.setIsAgreed("checked")
                props.hideDialog()
              }}
              >Agree</Button>
              <Button color="red" onPress={() => {
                props.setIsAgreed("unchecked")
                props.hideDialog()
              }
              }>Decline</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </Provider>
  );
};

export default DialogBox;