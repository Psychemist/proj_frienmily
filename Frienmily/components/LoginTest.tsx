import React from 'react'
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native'

interface LoginDataType {
    username: string;
    password: string;
    // profilePicture: FileList
}


export default function LoginTest() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginDataType>({
        defaultValues: {
            username: "Mike",
            password: ""
        }
    })

    const username = watch("username")

    const storeInfoInRedux = () => {

    }
    return (
        <View>
            <Text>heyhey</Text>
            <Text>Hello! <span className="nameDisplay">{username}</span></Text>

            <form onSubmit={handleSubmit((data) => {
                console.log(data)
                const formData = new FormData()
                formData.append("username", data.username)
                formData.append("password", data.password)
                // formData.append("profilePicture", data.profilePicture?.[0])

            })}>
                <label>
                    <Text>Name:</Text>
                    <input type="text" {...register("username", { required: true })} />
                    {errors.username && <Text>Username is mandatory</Text>}
                </label>
                <br />
                <label>
                    <Text>Password:</Text>
                    <input type="text" {...register("password", { required: true })} />
                    {errors.password && <Text>Password is mandatory</Text>}
                </label>
                <br />
                <label>
                    <Text>Profile Picture:</Text>
                    {/* <input type="file" {...register("profilePicture")} /> */}
                </label>

                <div><input type="submit" value="Submit" /></div>
            </form>

        </View>
    )
}
