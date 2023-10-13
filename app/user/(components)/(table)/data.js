import React from "react";
const columns = [
    // { name: "ID", uid: "id",  },
    { name: "Presumptive diagnosis operator", uid: "name",  },
    // { name: "Description", uid: "description", },
    { name: "VALIDATION", uid: "validation" },
    { name: "STATUS", uid: "status",  },
    {name:'TIME',uid: 'EndTime'},
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];



export { columns, statusOptions };
