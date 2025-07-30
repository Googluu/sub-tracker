import { Router } from "express";

const subcriptionRouter = Router();

subcriptionRouter.get('/', (req, res) => {res.send({title: "Get all subcriptions"})});
subcriptionRouter.get('/:id', (req, res) => {res.send({title: "Get subcription"})});
subcriptionRouter.post('/', (req, res) => {res.send({title: "Create subcription"})});
subcriptionRouter.put('/:id', (req, res) => {res.send({title: "Update subcription"})});
subcriptionRouter.delete('/:id', (req, res) => {res.send({title: "Delete subcription"})});
subcriptionRouter.get('/user/:id', (req, res) => {res.send({title: "Get all user subcriptions"})});
subcriptionRouter.put('/:id/cancel', (req, res) => {res.send({title: "Cancel subcription"})});
subcriptionRouter.get('/upcoming-renewals', (req, res) => {res.send({title: "Get upcoming renewals"})});

export default subcriptionRouter;