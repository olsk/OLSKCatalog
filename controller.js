exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/OLSKCatalog',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'OLSKCatalogStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};

exports.OLSKControllerSharedStaticAssetFolders = function () {
	return [
		'node_modules',
	];
};

