import Directory from './components/directory/directory.component';

import { categories } from './data/categories';

const App = () => {
	return <Directory categories={categories} />;
};

export default App;
