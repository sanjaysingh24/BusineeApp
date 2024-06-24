import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid ,Image,StyleSheet} from 'react-native';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { db } from '../../config/FirebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

export default function Review({ businessdetail,getbusinessdetail }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState('');
  const { user } = useUser();

  const onSubmit = async () => {
    if (!userInput.trim()) {
      ToastAndroid.show('Please enter a comment.', ToastAndroid.SHORT);
      return;
    }

    try {
      const docRef = doc(db, 'BusinessList', businessdetail?.id);
      await updateDoc(docRef, {
        reviews: arrayUnion({
          rating: rating,
          comment: userInput,
          userName: user.fullName,
          userImage: user?.imageUrl,
          userEmail: user.primaryEmailAddress?.emailAddress,
        }),
      });
      ToastAndroid.show('Comment added successfully!', ToastAndroid.BOTTOM);
      setUserInput('');

    } catch (error) {
      console.error('Error adding comment:', error);
      ToastAndroid.show('Failed to add comment. Please try again.', ToastAndroid.SHORT);
    }
    getbusinessdetail();
  };

  return (
    <View style={{ padding: 20, paddingTop: 0, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Review</Text>
      <View>
        <Rating
          showRating={false}
          imageSize={20}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          onChangeText={(value) => setUserInput(value)}
          value={userInput}
          numberOfLines={4}
          placeholder="Write your comment"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: 'top',
            marginTop: 10,
          }}
          multiline={true}
        />
        <TouchableOpacity
          onPress={onSubmit}
          style={{ backgroundColor: Colors.PRIMARY, borderRadius: 6, marginTop: 10 }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', paddingVertical: 10 }}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Display the previous ratings */}
      <View>
        {businessdetail?.reviews?.map((item, index) => (
          <View key={index} style={styles.maincontainer}>
           <View>
           <Image source ={{uri:item.userImage}} style={styles.imageContainer}></Image>
           </View>
           <View style={styles.ratingContainer}>
           <Text style={styles.userStyle}>{item.userName}</Text>
            <Rating readonly startingValue={item.rating} imageSize={20} style={{ paddingVertical: 5, alignItems:'flex-start'}} />
            <Text style ={{color:Colors.GRAY}}>{item.comment}</Text>
            </View>
          
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  maincontainer:{
    marginTop: 20, 
    display:'flex',
     flexDirection:'row',
      gap:10,
      alignItems:'center',
      padding:10,
      borderWidth:1,
      borderColor:Colors.GRAY,
      borderRadius:10,
      marginTop:10
  },
  imageContainer:{
    width:50,height:50,borderRadius:99
  },
  ratingContainer:{
    
    display:'flex',
    gap:5
  },
  userStyle:{
    fontSize: 14, fontWeight:'500'
  }
})