/*
 * Copyright (c) 2020. Prototype
 */

const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { mockData } = require('./mock');

const apiVersion = '/v1.0';
const successResponse = { status: 200 };

// Get dynamic param from url example
// Url - '/article/:id'
// Get id code:
// req.params.id

// Get GET - params from request url
// const {mailType, mailCtg} = req.query

// Get POST, PUT - request data example
// const body = req.body;

// Return server error example
// res.status(404).json({error: "not found"});

router.post('/login', function(req, res, next) {
  res.json(mockData['current-user-info']);
});

router.get(apiVersion + '/user/current', function(req, res, next) {
  res.json(mockData['current-user-info']);
});

router.get(apiVersion + '/settings', function(req, res, next) {
  res.json(mockData['settings']);
});

/** Администрирование пользователей */
router.get(apiVersion + '/prefilleduserinfo', function(req, res, next) {
  res.json(mockData.prefilledUserInfo);
});

router.get(apiVersion + '/user', function(req, res, next) {
  const usersData = { ...mockData['get-all-users'] };
  const allUsers = mockData['get-all-users'][['content']];
  let preparedUsers = allUsers;
  const { roles } = req.query;

  if (roles && roles.includes('COURIER')) {
    preparedUsers = convertUsersToCouriers(allUsers);
    usersData.content = preparedUsers;
  }

  res.json(usersData);

  // utils

  function convertUsersToCouriers(users) {
    const result = [];

    for (let i = 0; i < users.length; i++) {
      const user = { ...users[i] };
      user.roles.length = 0;
      user.name = `${user.name} courier-${i + 1}`;
      user.fio = `Курьер №${i + 1}`;
      user.roles = [
        {
          name: 'COURIER',
          text: 'Курьер',
        },
      ];
      result.push(user);
    }

    return result;
  }
});

router.get(apiVersion + '/user/:id', function(req, res, next) {
  const allUsers = mockData['get-all-users']['content'];
  const userId = req.params.id;
  let user = {};
  for (let i = 0; i < allUsers.length; i++) {
    if (userId === allUsers[i].id) {
      user = allUsers[i];
      break;
    }
  }
  res.json(user);
});

router.put(apiVersion + '/user/:id', function(req, res, next) {
  res.json(mockData['get-user']);
});

router.delete(apiVersion + '/user/:id', function(req, res, next) {
  res.json(mockData['delete-user']);
});

router.post(apiVersion + '/user', function(req, res, next) {
  res.json(mockData['add-user']);
});

router.get(apiVersion + '/role', function(req, res, next) {
  res.json(mockData['get-all-roles']);
});

router.put(apiVersion + '/user/:userId/password', function(req, res, next) {
  res.json(mockData['set-password']);
});

router.get(apiVersion + '/user/:id/ukd', function(req, res, next) {
  res.json(mockData['ukd-list-by-user-id']);
});

module.exports = router;
