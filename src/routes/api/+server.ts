import { tutorials } from '$db/tutorials';
import { ObjectId } from 'bson';


export const editState = async function ({ request }: any) {

    return new Response("Sucessfully updated the record");
}
export async function GET(url: URL) {
    console.log('export async function GET')
	const id = url.searchParams.get('id');
    // console.log('id ::: ' + id);
	// const state = url.searchParams.get('state');
	// if (!id) return new Response("Missing required param 'id'", { status: 400 });
	// let { modifiedCount } = await tutorials.updateOne({ _id: new ObjectId(id) }, { $set: { state: state } });
    // if (modifiedCount < 1)
    //     return new Response("Failed to update the record", { status: 500})
    return new Response("Sucessfully updated the record");
}
