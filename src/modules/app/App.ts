import { Request, Response } from 'express';

export default (request: Request, response: Response) => {
	response.status(200).json({
		success: true,
		data: [
			{
				appName: 'Support App',
				description: process.env.npm_package_description,
				author: 'Oparah DC <oparahdc@gmail.com>',
				website: 'N/A',
			},
		],
	});
};
