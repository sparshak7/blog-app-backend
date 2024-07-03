import { Request, Response } from "express";
import User from "../model/user";

const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id })
    if(existingUser) {
        return res.status(200).send();
    }

    const newUser = new User(req.body)
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error creating the user.",
    });
  }
};

const updateUser = async(req: Request, res: Response) => {
  try {
    const { name, city, country } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    user.name = name || user.name;
    user.city = city || user.city;
    user.country = country || user.country;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error updating the user details.",
    });
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error fetching the user details.",
    });
  }
};

export default { createUser, updateUser, getUser };
