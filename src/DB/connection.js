import { createClient } from '@supabase/supabase-js'

// const connectDB = async () => {

//     try {
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log('MongoDB connection: Success')
//     } catch (error) {
//         console.log('error connecting to MongoDB')
//     }
// }

// export default connectDB



    const supabaseUrl = process.env.SUPABASE_URL
    const supabasekey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabasekey) {
    throw new Error('Supabase URL and Service Role Key must be provided in .env file');
    }

    const supabase = createClient(supabaseUrl, supabasekey)

    export default supabase
  

