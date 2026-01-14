import { Webhook } from "svix"

import {User} from "../models/user.model.js"


// Api Controller Function

const clerkWebhooks = async(req, res) => {
    try {
        // Create a svix instance

        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await webhook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        const { type, data } = req.body;

        switch (type) {
            case 'user.created':


                {

                    const userData = {
                        _id: data.id,
                        email: data.email_addresses[0].email_address,
                        name: data.first_name + " " + data.last_name,
                        image: data.image_url,
                        resume: ''

                    }
                    await User.create(userData);
                    res.json({ user: userData });
                    console.log(userData);
                    console.log("User Created");
                    console.log(await User.findById(data.id))
                    break;


                }
            case 'user.updated':

                {
                    const userData = {

                        email: data.email_addresses[0].email_address,
                        name: data.first_name + " " + data.last_name,
                        image: data.image_url,


                    }
                    await User.findByIdAndUpdate(data.id);
                    res.json({});
                    break;

                }
            case 'user.deleted':

                {
                    await User.findByIdAndDelete(data.id);
                    res.json({})
                    console.log("User Deleted");
                    break;

                }
            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({ sucess: false, message: "Webhooks Error" })

    }

}
export default clerkWebhooks;