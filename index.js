module.exports.register = function (Handlebars, options) {

	/**
	 * list
	 * ul like easy list table creator
	 * @default class = ul (always)
	 * @param: image -> provide image for bullet
	 * @param: class -> add a specific class
	 * @param: type -> set type of the list ul/ol (ul is default)
	 *
	 * @usage
	 * {{#list class="optional" image="optional.png" type="ol"}}
	 * - item 1
	 * - item 2
	 * {{/list}}
	 *
	 * no spaces before each '-' (start of item)
	 */
	Handlebars.registerHelper('list', function (context) {

		var attr = {};

        for (var prop in context.hash) {
            attr[Handlebars.escapeExpression(prop)] = context.hash[prop];
        }

		var bulletConstruct = function(bullet) {
			var regx = /.*[.](?:png|gif|jpg)/g;
			if (typeof bullet === 'undefined') {
				return '•';
			}
			else if (bullet === false || bullet === "false") {
				return false;
			}
			else if(regx.exec(bullet)) {
				var alt = attr.bulletAlt ? attr.bulletAlt : '•';
				return '<img src="' + bullet + '" alt="' + alt + '"/>';
			}
			return bullet;
		};

		var bullet = bulletConstruct(attr.bullet),
			bulletTmpl = '<td class="li li-bullet"><p>%</p></td>',
			bulletHtml = bullet !== false ? bulletTmpl.replace('%', bullet) : '';

		attr.type = attr.type ? attr.type : 'ul';

		if (typeof attr.class == 'undefined')
			attr.class = '';

		var lines = context.fn(this).split('\n');
		var html = '<table class="' + attr.type + ' ' + attr.class + '">';

		for (var i = 0; i < lines.length - 1; i++) {

			switch (lines[i].charAt(0)) {
				case '-':
					if (i > 0) {
						html += '</td></tr>';
					}

					bulletHtml = attr.type == 'ol' ? bulletTmpl.replace('%', i + 1) : bulletHtml;


					html += '<tr>' +
						bulletHtml + // <td class="li li-bullet">%</td> or nothing
						'<td class="li li-content">' +
						lines[i].substr(1);
					break;
				default:
					html += ' ' + lines[i];
			}
		}
		html += '</td></tr>';
		html += '</table>';
		return html;
	});
};
