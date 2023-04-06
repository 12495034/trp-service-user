import React from "react";
import { ScrollView} from 'react-native';
import { Button, Dialog, Portal, Provider} from 'react-native-paper';

// dialog box component used to display information to the user, such as terms and conditions
const DialogBox = (props) => {
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