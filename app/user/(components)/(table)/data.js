import React from 'react';
const columns = [
	// { name: "ID", uid: "id",  },
	{ name: 'Presumptive Diagnosis Operator', uid: 'name' },
	// { name: "Description", uid: "description", },
	{ name: 'Validation', uid: 'validation' },
	{ name: 'Status', uid: 'status' },
	{ name: 'Time', uid: 'EndTime' },
	{ name: 'Projected Results', uid: 'Output' },
	{ name: 'Actions', uid: 'actions' },
];

const statusOptions = [
	{ name: 'Active', uid: 'active' },
	{ name: 'Paused', uid: 'paused' },
	{ name: 'Vacation', uid: 'vacation' },
];

export { columns, statusOptions };
