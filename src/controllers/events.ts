import { Request, Response } from "express";
import axios from "axios";
import { Client } from "@notionhq/client";
import config from "../config/config";
import ical from "ical";

import db from '../db/db';

const client = new Client({ auth: config.apikey });

const getCal = async (req: Request, res: Response) => {
  (async () => {
    const response = await client.databases.retrieve({
      database_id: config.dbkey,
    });
    console.log(response);
  })();
};

const createAll = async (_: Request, res: Response) => {
  const responses = await Promise.all(
    config.caladdr.map((addr) => axios(addr))
  );

  const parsedResponses = responses
    .map((response : Response) => ical.parseICS(response.data))
    .map((ics) => Object.values(ics))
    .reduce((acc, val) => [...acc, ...val], []);

  const events = Object.values(parsedResponses)
    .filter((event: any) => event.type === "VEVENT")
    .map((event: any) => ({
      uid:     event.uid,
      summary: event.summary,
      start:   event.start,
      end:     event.end,
    }));

  await Promise.all(
    events
    .filter(async e => {
      const ev = db.sequelize.models.EventsModel.findOne({ where: { calId: e.uid }})
      return !!ev
    })
    .map(async e => {
      const page = await client.pages.create({
        parent: {
          database_id: config.dbkey,
        },
        properties: {
          Name: {
            type: "title",
            title: [
              {
                type: "text",
                text: {
                  content: e.summary,
                },
              },
            ],
          },
          Date: {
            type: "date",
            date: {
              start: e.start,
              end: e.end,
            },
          },
        },
      });
      await db.sequelize.models.EventsModel.create({ id: page.id, calId: e.uid });
    })
  ).catch(e => console.log(e));
  
  res.send("hi");
};

export default { createAll, getCal };
