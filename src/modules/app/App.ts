import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: [
      {
        appName: 'Fliqpay',
        description: 'Welcome to my Fliqpay assessment',
        author: 'Oparah DC',
        website: '',
      },
    ],
  });
};
