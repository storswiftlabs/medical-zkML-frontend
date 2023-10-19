export interface Welcome {
	ok: boolean;
	count: number;
	msg: string;
	data: Datum[];
}

export interface Datum {
	Name: string;
	Description: string;
}

export interface WelcomeInfo {
	ok: boolean;
	msg: string;
	data: Data;
}

export interface Data {
	Name: string;
	Description: string;
	Inputs: Input[];
	Output: Output;
}

export interface Input {
	Name: string;
	Description: string;
	Index: string;
	InputMethod: string;
	Select: Select[];
}

export interface Select {
	Key: string;
	Value: number | string;
}

export interface Output {
	Description: string;
	Result: Result[];
}

export interface Result {
	Key: string;
	Value: string;
}

export interface OperatorListType {
	ok: boolean;
	count: number;
	msg: string;
	data: OperatorList[];
}

export interface OutcomesType {
	ok: boolean;
	msg: string;
	count: number;
	data: OutcomesType_Data[];
}

export interface OutcomesType_Data {
	ID: number;
	Disease: string;
	EndTime: number;
	Status: string;
	Inputs: string;
	Message: string;
	Output: string;
	Module:string
}

export interface ArticleType {
	disease: string;
	url: string;
	time: number;
	icon: string;
	title: string;
}
export interface ChecklistType {
	ID: number;
	CreatedAt: Date;
	UpdatedAt: Date;
	DeletedAt: null;
	Disease: string;
	URL: string;
	Time: number;
	Icon: string;
	Title: string;
}

export interface OperatorList {
	name: string;
	description: string;
}
