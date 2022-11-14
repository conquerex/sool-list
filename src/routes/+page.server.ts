import { ObjectId } from 'bson';
import { tutorials } from '$db/tutorials';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	console.log('>>>> start');
	const data = await tutorials
		.find(
			{}
			,{
				// limit: 50,
				projection: {
					_id: String,
					title: String,
					state: Number
				}
			}
		)
		.toArray();

	
	data.forEach((item) => {
		if (item.title.length > 20) {
			item.length = item.title.length * 0.7
		// } else if (item.title.length <= 20 && item.title.length > 14) {
		// 	console.log('14 :: ' + item.title)
		// 	item.length = item.title.length * 0.8
		} else {
			item.length = item.title.length * 0.85
		}
	})
	
	const loadData = JSON.parse(JSON.stringify(data))
	return {
		tutorials: loadData
	};
};

export const actions: Actions = {
	editUser: async ({ request }: any) => {
		console.log('>>>> editUser start');
		// get form data from Edit User form
		const values = await request.formData();
		
		const state = Number.parseInt(values.get('state'));
		const newState = state > 1 ? 0 : (state + 1)
		
		const _id: string = values.get('id');
		const objectId = new ObjectId(_id);
		
		// mongo db update a document where ID is equal to the _id submitted from the form
		await tutorials.updateOne(
			{ _id: objectId },
			{
				$set: {
					state: newState
				}
			}
		);

		return { success: true };
	}
};
