import { NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken';
 
export async function POST(request: Request) {

    const {email, password} = await request.json();
    
    const guestList = [
        {
            email: "ammar@gmail.com",
            password: "123456abc",
            type: "normal person"
        },
        {
            email: "saba@gmail.com",
            password: "12345abcd",
            type: "vip"
        },
        {
            email: "ali@gmail.com",
            password: "12345abcde",
            type: "vip"
        }
    ]

    const secretWord = process.env.SECRET_WORD
  
    const guest = guestList.find((g) => g.email == email && g.password == password)
    if (guest){
        const token = jwt.sign(guest, secretWord as string, {
            expiresIn: '10h'
        })
        return NextResponse.json({
            message: "You are vip, You may go inside",
            token
        })
        } else{
            return NextResponse.json({
                message: "Sorry you are not in the list"
            })
        }
    }