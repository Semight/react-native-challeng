import CustomButton from "@/components/ToDo/CustomButton";
import WelcomeMessage from "@/components/WelcomeMessage/WelcomeMessage";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <View className="flex-1 bg-sky-100 pt-24 px-4">
      <WelcomeMessage name="David" />

      {/* <View className="mt-6 flex flex-col gap-2 space-y-4 items-center">
        <CustomButton
          title="Click Me"
          onPress={() => alert("Hello David 🚀")}
        />

        <CustomButton
          title="Delete"
          bgColor="red"
          onPress={() => alert("Deleted ❌")}
        />
      </View> */}

      {/* Counter */}
      {/* <View className="mt-8 w-full items-center">
        <Counter initialValue={5} step={1} />
      </View> */}

      {/* Posts List */}
      {/* <View className="mt-8 flex-1 w-full">
        <PostsList />
      </View> */}

      {/* <View className="mt-8 items-center flex-1 w-full">
      <ProfileCard
        name="David Irefin"
        bio="Frontend Developer | React & React Native Enthusiast"
        avatarUrl="https://scontent.flos1-1.fna.fbcdn.net/v/t39.30808-1/519130936_1509395920442459_4875256651533841700_n.jpg?stp=c0.0.720.720a_dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeF4kYHyDZrq6HNyr2d37NevhHDj7oCofaWEcOPugKh9pSKx3_zKOkCmse1hPFOx47sFm_cGm-em3Sxdo-AgAtio&_nc_ohc=BdCXpR_bDPMQ7kNvwEFy6QA&_nc_oc=AdmSH6xVYT8jdKSNZ0DxAfSjksXjeLWTjrRv-JENhwy7pDbmibd1ALRpfdOKUnCLDMs&_nc_zt=24&_nc_ht=scontent.flos1-1.fna&_nc_gid=Qlf-lWrc_vTRBlRA6FM5wA&oh=00_AfbOboT4VzL47faL3lzr80170RCzVGwTY3rLNyBkG_ibbg&oe=68C18BC8"
      />
      </View> */}

      <View className="mt-8 items-center flex-1 w-full">
      <CustomButton
      className="p-4"
        title="Go to Todo App"
        onPress={() => router.push("/todo")}
      />
      </View>

    </View>
  );
}
