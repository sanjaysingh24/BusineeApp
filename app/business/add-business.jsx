import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, storage } from '../../config/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useUser();
  const [image, setImage] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerShown: true
    });
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().Name,
          value: doc.data().Name
        }
      ]);
    });
  };

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.assets[0].uri);
      console.log(result);
    }
  };

  const onAddNewBusiness = async () => {
    if (!name || !address || !contact || !category) {
      ToastAndroid.show("Please fill in all required fields.", ToastAndroid.LONG);
      return;
    }

    setLoading(true);
    try {
      const fileName = Date.now().toString() + ".jpg";
      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(storage, 'business-app/' + fileName);
      
      await uploadBytes(imageRef, blob);
      console.log("File uploaded");

      const downloadUrl = await getDownloadURL(imageRef);
      console.log(downloadUrl);
      
      await saveBusinessDetail(downloadUrl);
    } catch (error) {
      console.error("Error adding business: ", error);
      ToastAndroid.show("Failed to add new business.", ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  const saveBusinessDetail = async (imageUrl) => {
    await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      about: about,
      website: website,
      category: category,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userImage: user?.imageUrl,
      Imageurl: imageUrl
    });
    
    ToastAndroid.show("New Business Added.", ToastAndroid.LONG);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Add New Business</Text>
      <Text style={{ color: Colors.GRAY }}>Fill all the details to add new business</Text>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
        {!image ? (
          <Image source={require('./../../assets/images/placeholder.png')} style={{ width: 100, height: 100 }} />
        ) : (
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder='Name'
          style={{ padding: 15, borderRadius: 5, borderWidth: 1, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY }}
        />
        <TextInput
          onChangeText={setAddress}
          value={address}
          placeholder='Address'
          style={{ padding: 15, borderRadius: 5, borderWidth: 1, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY }}
        />
        <TextInput
          onChangeText={setContact}
          value={contact}
          placeholder='Contact'
          style={{ padding: 15, borderRadius: 5, borderWidth: 1, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY }}
        />
        <TextInput
          onChangeText={setWebsite}
          value={website}
          placeholder='Website'
          style={{ padding: 15, borderRadius: 5, borderWidth: 1, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY }}
        />
        <TextInput
          onChangeText={setAbout}
          value={about}
          numberOfLines={5}
          placeholder='About'
          style={{ height: 100, padding: 15, borderRadius: 5, borderWidth: 1, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY }}
        />
      </View>
      <View style={{ borderRadius: 5, borderWidth: 1, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY }}>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={categoryList}
        />
      </View>
      <TouchableOpacity disabled={loading} onPress={onAddNewBusiness} style={{ padding: 15, borderRadius: 5, marginTop: 20, backgroundColor: Colors.PRIMARY }}>
        {loading ? (
          <ActivityIndicator size='large' color='#fff' />
        ) : (
          <Text style={{ textAlign: 'center', fontWeight: '500', color: 'white' }}>Add New Business</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
