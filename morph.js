/*!
 * MorphSVGPlugin 3.6.0
 */
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {});
})(this, function (t) {
    "use strict";
    function m(t) {
        return "string" == typeof t;
    }
    var b = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        N = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        A = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
        r = /(^[#\.][a-z]|[a-y][a-z])/i,
        D = Math.PI / 180,
        E = Math.sin,
        k = Math.cos,
        Q = Math.abs,
        J = Math.sqrt,
        h = function _isNumber(t) {
            return "number" == typeof t;
        },
        s = function _round(t) {
            return Math.round(1e5 * t) / 1e5 || 0;
        };
    function reverseSegment(t) {
        var e,
            n = 0;
        for (t.reverse(); n < t.length; n += 2) (e = t[n]), (t[n] = t[n + 1]), (t[n + 1] = e);
        t.reversed = !t.reversed;
    }
    var R = { rect: "rx,ry,x,y,width,height", circle: "r,cx,cy", ellipse: "rx,ry,cx,cy", line: "x1,x2,y1,y2" };
    function convertToPath(t, e) {
        var n,
            r,
            o,
            i,
            a,
            h,
            s,
            l,
            g,
            c,
            f,
            p,
            u,
            d,
            P,
            _,
            w,
            m,
            v,
            y,
            x,
            M,
            T = t.tagName.toLowerCase(),
            b = 0.552284749831;
        return "path" !== T && t.getBBox
            ? ((h = (function _createPath(t, e) {
                  var n,
                      r = document.createElementNS("http://www.w3.org/2000/svg", "path"),
                      o = [].slice.call(t.attributes),
                      i = o.length;
                  for (e = "," + e + ","; -1 < --i; ) (n = o[i].nodeName.toLowerCase()), e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, o[i].nodeValue);
                  return r;
              })(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points")),
              (M = (function _attrToObj(t, e) {
                  for (var n = e ? e.split(",") : [], r = {}, o = n.length; -1 < --o; ) r[n[o]] = +t.getAttribute(n[o]) || 0;
                  return r;
              })(t, R[T])),
              "rect" === T
                  ? ((i = M.rx),
                    (a = M.ry || i),
                    (r = M.x),
                    (o = M.y),
                    (c = M.width - 2 * i),
                    (f = M.height - 2 * a),
                    (n =
                        i || a
                            ? "M" +
                              (_ = (d = (u = r + i) + c) + i) +
                              "," +
                              (m = o + a) +
                              " V" +
                              (v = m + f) +
                              " C" +
                              [
                                  _,
                                  (y = v + a * b),
                                  (P = d + i * b),
                                  (x = v + a),
                                  d,
                                  x,
                                  d - (d - u) / 3,
                                  x,
                                  u + (d - u) / 3,
                                  x,
                                  u,
                                  x,
                                  (p = r + i * (1 - b)),
                                  x,
                                  r,
                                  y,
                                  r,
                                  v,
                                  r,
                                  v - (v - m) / 3,
                                  r,
                                  m + (v - m) / 3,
                                  r,
                                  m,
                                  r,
                                  (w = o + a * (1 - b)),
                                  p,
                                  o,
                                  u,
                                  o,
                                  u + (d - u) / 3,
                                  o,
                                  d - (d - u) / 3,
                                  o,
                                  d,
                                  o,
                                  P,
                                  o,
                                  _,
                                  w,
                                  _,
                                  m,
                              ].join(",") +
                              "z"
                            : "M" + (r + c) + "," + o + " v" + f + " h" + -c + " v" + -f + " h" + c + "z"))
                  : "circle" === T || "ellipse" === T
                  ? ((l = "circle" === T ? (i = a = M.r) * b : ((i = M.rx), (a = M.ry) * b)),
                    (n =
                        "M" +
                        ((r = M.cx) + i) +
                        "," +
                        (o = M.cy) +
                        " C" +
                        [r + i, o + l, r + (s = i * b), o + a, r, o + a, r - s, o + a, r - i, o + l, r - i, o, r - i, o - l, r - s, o - a, r, o - a, r + s, o - a, r + i, o - l, r + i, o].join(",") +
                        "z"))
                  : "line" === T
                  ? (n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2)
                  : ("polyline" !== T && "polygon" !== T) || ((n = "M" + (r = (g = (t.getAttribute("points") + "").match(N) || []).shift()) + "," + (o = g.shift()) + " L" + g.join(",")), "polygon" === T && (n += "," + r + "," + o + "z")),
              h.setAttribute("d", rawPathToString((h._gsRawPath = stringToRawPath(n)))),
              e && t.parentNode && (t.parentNode.insertBefore(h, t), t.parentNode.removeChild(t)),
              h)
            : t;
    }
    function arcToSegment(t, e, n, r, o, i, a, h, s) {
        if (t !== h || e !== s) {
            (n = Q(n)), (r = Q(r));
            var l = (o % 360) * D,
                g = k(l),
                c = E(l),
                f = Math.PI,
                p = 2 * f,
                u = (t - h) / 2,
                d = (e - s) / 2,
                P = g * u + c * d,
                _ = -c * u + g * d,
                w = P * P,
                m = _ * _,
                v = w / (n * n) + m / (r * r);
            1 < v && ((n = J(v) * n), (r = J(v) * r));
            var y = n * n,
                x = r * r,
                M = (y * x - y * m - x * w) / (y * m + x * w);
            M < 0 && (M = 0);
            var T = (i === a ? -1 : 1) * J(M),
                b = ((n * _) / r) * T,
                S = ((-r * P) / n) * T,
                N = g * b - c * S + (t + h) / 2,
                z = c * b + g * S + (e + s) / 2,
                A = (P - b) / n,
                R = (_ - S) / r,
                O = (-P - b) / n,
                C = (-_ - S) / r,
                j = A * A + R * R,
                Y = (R < 0 ? -1 : 1) * Math.acos(A / J(j)),
                V = (A * C - R * O < 0 ? -1 : 1) * Math.acos((A * O + R * C) / J(j * (O * O + C * C)));
            isNaN(V) && (V = f), !a && 0 < V ? (V -= p) : a && V < 0 && (V += p), (Y %= p), (V %= p);
            var F,
                I = Math.ceil(Q(V) / (p / 4)),
                U = [],
                X = V / I,
                L = ((4 / 3) * E(X / 2)) / (1 + k(X / 2)),
                G = g * n,
                q = c * n,
                H = c * -r,
                B = g * r;
            for (F = 0; F < I; F++) (P = k((o = Y + F * X))), (_ = E(o)), (A = k((o += X))), (R = E(o)), U.push(P - L * _, _ + L * P, A + L * R, R - L * A, A, R);
            for (F = 0; F < U.length; F += 2) (P = U[F]), (_ = U[F + 1]), (U[F] = P * G + _ * H + N), (U[F + 1] = P * q + _ * B + z);
            return (U[F - 2] = h), (U[F - 1] = s), U;
        }
    }
    function stringToRawPath(t) {
        function yc(t, e, n, r) {
            (g = (n - t) / 3), (c = (r - e) / 3), h.push(t + g, e + c, n - g, r - c, n, r);
        }
        var e,
            n,
            r,
            o,
            i,
            a,
            h,
            s,
            l,
            g,
            c,
            f,
            p,
            u,
            d,
            P =
                (t + "")
                    .replace(A, function (t) {
                        var e = +t;
                        return e < 1e-4 && -1e-4 < e ? 0 : e;
                    })
                    .match(b) || [],
            _ = [],
            w = 0,
            m = 0,
            v = P.length,
            y = 0,
            x = "ERROR: malformed path: " + t;
        if (!t || !isNaN(P[0]) || isNaN(P[1])) return console.log(x), _;
        for (e = 0; e < v; e++)
            if (((p = i), isNaN(P[e]) ? (a = (i = P[e].toUpperCase()) !== P[e]) : e--, (r = +P[e + 1]), (o = +P[e + 2]), a && ((r += w), (o += m)), e || ((s = r), (l = o)), "M" === i))
                h && (h.length < 8 ? --_.length : (y += h.length)), (w = s = r), (m = l = o), (h = [r, o]), _.push(h), (e += 2), (i = "L");
            else if ("C" === i) a || (w = m = 0), (h = h || [0, 0]).push(r, o, w + 1 * P[e + 3], m + 1 * P[e + 4], (w += 1 * P[e + 5]), (m += 1 * P[e + 6])), (e += 6);
            else if ("S" === i) (g = w), (c = m), ("C" !== p && "S" !== p) || ((g += w - h[h.length - 4]), (c += m - h[h.length - 3])), a || (w = m = 0), h.push(g, c, r, o, (w += 1 * P[e + 3]), (m += 1 * P[e + 4])), (e += 4);
            else if ("Q" === i) (g = w + (2 / 3) * (r - w)), (c = m + (2 / 3) * (o - m)), a || (w = m = 0), (w += 1 * P[e + 3]), (m += 1 * P[e + 4]), h.push(g, c, w + (2 / 3) * (r - w), m + (2 / 3) * (o - m), w, m), (e += 4);
            else if ("T" === i) (g = w - h[h.length - 4]), (c = m - h[h.length - 3]), h.push(w + g, m + c, r + (2 / 3) * (w + 1.5 * g - r), o + (2 / 3) * (m + 1.5 * c - o), (w = r), (m = o)), (e += 2);
            else if ("H" === i) yc(w, m, (w = r), m), (e += 1);
            else if ("V" === i) yc(w, m, w, (m = r + (a ? m - w : 0))), (e += 1);
            else if ("L" === i || "Z" === i) "Z" === i && ((r = s), (o = l), (h.closed = !0)), ("L" === i || 0.5 < Q(w - r) || 0.5 < Q(m - o)) && (yc(w, m, r, o), "L" === i && (e += 2)), (w = r), (m = o);
            else if ("A" === i) {
                if (
                    ((u = P[e + 4]),
                    (d = P[e + 5]),
                    (g = P[e + 6]),
                    (c = P[e + 7]),
                    (n = 7),
                    1 < u.length && (u.length < 3 ? ((c = g), (g = d), n--) : ((c = d), (g = u.substr(2)), (n -= 2)), (d = u.charAt(1)), (u = u.charAt(0))),
                    (f = arcToSegment(w, m, +P[e + 1], +P[e + 2], +P[e + 3], +u, +d, (a ? w : 0) + 1 * g, (a ? m : 0) + 1 * c)),
                    (e += n),
                    f)
                )
                    for (n = 0; n < f.length; n++) h.push(f[n]);
                (w = h[h.length - 2]), (m = h[h.length - 1]);
            } else console.log(x);
        return (e = h.length) < 6 ? (_.pop(), (e = 0)) : h[0] === h[e - 2] && h[1] === h[e - 1] && (h.closed = !0), (_.totalPoints = y + e), _;
    }
    function rawPathToString(t) {
        h(t[0]) && (t = [t]);
        var e,
            n,
            r,
            o,
            i = "",
            a = t.length;
        for (n = 0; n < a; n++) {
            for (o = t[n], i += "M" + s(o[0]) + "," + s(o[1]) + " C", e = o.length, r = 2; r < e; r++) i += s(o[r++]) + "," + s(o[r++]) + " " + s(o[r++]) + "," + s(o[r++]) + " " + s(o[r++]) + "," + s(o[r]) + " ";
            o.closed && (i += "z");
        }
        return i;
    }
    function y() {
        return n || ("undefined" != typeof window && (n = window.gsap) && n.registerPlugin && n);
    }
    function z(t) {
        return "function" == typeof t;
    }
    function M(t) {
        return console && console.warn(t);
    }
    function P() {
        return String.fromCharCode.apply(null, arguments);
    }
    function S(t) {
        var e,
            n = t.length,
            r = 0,
            o = 0;
        for (e = 0; e < n; e++) (r += t[e++]), (o += t[e]);
        return [r / (n / 2), o / (n / 2)];
    }
    function T(t) {
        var e,
            n,
            r,
            o = t.length,
            i = t[0],
            a = i,
            h = t[1],
            s = h;
        for (r = 6; r < o; r += 6) i < (e = t[r]) ? (i = e) : e < a && (a = e), h < (n = t[r + 1]) ? (h = n) : n < s && (s = n);
        return (t.centerX = (i + a) / 2), (t.centerY = (h + s) / 2), (t.size = (i - a) * (h - s));
    }
    function U(t, e) {
        void 0 === e && (e = 3);
        for (var n, r, o, i, a, h, s, l, g, c, f, p, u, d, P, _, w = t.length, m = t[0][0], v = m, y = t[0][1], x = y, M = 1 / e; -1 < --w; )
            for (n = (a = t[w]).length, i = 6; i < n; i += 6)
                for (g = a[i], c = a[i + 1], f = a[i + 2] - g, d = a[i + 3] - c, p = a[i + 4] - g, P = a[i + 5] - c, u = a[i + 6] - g, _ = a[i + 7] - c, h = e; -1 < --h; )
                    m < (r = ((s = M * h) * s * u + 3 * (l = 1 - s) * (s * p + l * f)) * s + g) ? (m = r) : r < v && (v = r), y < (o = (s * s * _ + 3 * l * (s * P + l * d)) * s + c) ? (y = o) : o < x && (x = o);
        return (t.centerX = (m + v) / 2), (t.centerY = (y + x) / 2), (t.left = v), (t.width = m - v), (t.top = x), (t.height = y - x), (t.size = (m - v) * (y - x));
    }
    function V(t, e) {
        return e.length - t.length;
    }
    function W(t, e) {
        var n = t.size || T(t),
            r = e.size || T(e);
        return Math.abs(r - n) < (n + r) / 20 ? e.centerX - t.centerX || e.centerY - t.centerY : r - n;
    }
    function X(t, e) {
        var n,
            r,
            o = t.slice(0),
            i = t.length,
            a = i - 2;
        for (e |= 0, n = 0; n < i; n++) (r = (n + e) % a), (t[n++] = o[r]), (t[n] = o[1 + r]);
    }
    function Y(t, e, n, r, o) {
        var i,
            a,
            h,
            s,
            l = t.length,
            g = 0,
            c = l - 2;
        for (n *= 6, a = 0; a < l; a += 6) (s = t[(i = (a + n) % c)] - (e[a] - r)), (h = t[1 + i] - (e[a + 1] - o)), (g += w(h * h + s * s));
        return g;
    }
    function Z(t, e, n) {
        var r,
            o,
            i,
            a = t.length,
            h = S(t),
            s = S(e),
            l = s[0] - h[0],
            g = s[1] - h[1],
            c = Y(t, e, 0, l, g),
            f = 0;
        for (i = 6; i < a; i += 6) (o = Y(t, e, i / 6, l, g)) < c && ((c = o), (f = i));
        if (n) for (reverseSegment((r = t.slice(0))), i = 6; i < a; i += 6) (o = Y(r, e, i / 6, l, g)) < c && ((c = o), (f = -i));
        return f / 6;
    }
    function $(t, e, n) {
        for (var r, o, i, a, h, s, l = t.length, g = 1e20, c = 0, f = 0; -1 < --l; ) for (s = (r = t[l]).length, h = 0; h < s; h += 6) (o = r[h] - e), (i = r[h + 1] - n), (a = w(o * o + i * i)) < g && ((g = a), (c = r[h]), (f = r[h + 1]));
        return [c, f];
    }
    function _(t, e, n, r, o, i) {
        var a,
            h,
            s,
            l,
            g = e.length,
            c = 0,
            f = Math.min(t.size || T(t), e[n].size || T(e[n])) * r,
            p = 1e20,
            u = t.centerX + o,
            d = t.centerY + i;
        for (a = n; a < g && !((e[a].size || T(e[a])) < f); a++) (h = e[a].centerX - u), (s = e[a].centerY - d), (l = w(h * h + s * s)) < p && ((c = a), (p = l));
        return (l = e[c]), e.splice(c, 1), l;
    }
    function aa(t, e) {
        var n,
            r,
            o,
            i,
            a,
            h,
            s,
            l,
            g,
            c,
            f,
            p,
            u,
            d,
            P = 0,
            _ = t.length,
            w = e / ((_ - 2) / 6);
        for (u = 2; u < _; u += 6)
            for (P += w; 0.999999 < P; )
                (n = t[u - 2]),
                    (r = t[u - 1]),
                    (o = t[u]),
                    (i = t[u + 1]),
                    (a = t[u + 2]),
                    (h = t[u + 3]),
                    (s = t[u + 4]),
                    (l = t[u + 5]),
                    (g = n + (o - n) * (d = 1 / ((Math.floor(P) || 1) + 1))),
                    (g += ((f = o + (a - o) * d) - g) * d),
                    (f += (a + (s - a) * d - f) * d),
                    (c = r + (i - r) * d),
                    (c += ((p = i + (h - i) * d) - c) * d),
                    (p += (h + (l - h) * d - p) * d),
                    t.splice(u, 4, n + (o - n) * d, r + (i - r) * d, g, c, g + (f - g) * d, c + (p - c) * d, f, p, a + (s - a) * d, h + (l - h) * d),
                    (u += 6),
                    (_ += 6),
                    P--;
        return t;
    }
    function ba(t, e, n, r, o) {
        var i,
            a,
            h,
            s,
            l,
            g,
            c,
            f = e.length - t.length,
            p = 0 < f ? e : t,
            u = 0 < f ? t : e,
            d = 0,
            P = "complexity" === r ? V : W,
            w = "position" === r ? 0 : "number" == typeof r ? r : 0.8,
            m = u.length,
            v = "object" == typeof n && n.push ? n.slice(0) : [n],
            y = "reverse" === v[0] || v[0] < 0,
            x = "log" === n;
        if (u[0]) {
            if (1 < p.length && (t.sort(P), e.sort(P), p.size || U(p), u.size || U(u), (g = p.centerX - u.centerX), (c = p.centerY - u.centerY), P === W)) for (m = 0; m < u.length; m++) p.splice(m, 0, _(u[m], p, m, w, g, c));
            if (f)
                for (f < 0 && (f = -f), p[0].length > u[0].length && aa(u[0], ((p[0].length - u[0].length) / 6) | 0), m = u.length; d < f; )
                    p[m].size || T(p[m]), (s = (h = $(u, p[m].centerX, p[m].centerY))[0]), (l = h[1]), (u[m++] = [s, l, s, l, s, l, s, l]), (u.totalPoints += 8), d++;
            for (m = 0; m < t.length; m++)
                (i = e[m]),
                    (a = t[m]),
                    (f = i.length - a.length) < 0 ? aa(i, (-f / 6) | 0) : 0 < f && aa(a, (f / 6) | 0),
                    y && !1 !== o && !a.reversed && reverseSegment(a),
                    (n = v[m] || 0 === v[m] ? v[m] : "auto") &&
                        (a.closed || (Math.abs(a[0] - a[a.length - 2]) < 0.5 && Math.abs(a[1] - a[a.length - 1]) < 0.5)
                            ? "auto" === n || "log" === n
                                ? ((v[m] = n = Z(a, i, !m || !1 === o)), n < 0 && ((y = !0), reverseSegment(a), (n = -n)), X(a, 6 * n))
                                : "reverse" !== n && (m && n < 0 && reverseSegment(a), X(a, 6 * (n < 0 ? -n : n)))
                            : !y &&
                              (("auto" === n &&
                                  Math.abs(i[0] - a[0]) + Math.abs(i[1] - a[1]) + Math.abs(i[i.length - 2] - a[a.length - 2]) + Math.abs(i[i.length - 1] - a[a.length - 1]) >
                                      Math.abs(i[0] - a[a.length - 2]) + Math.abs(i[1] - a[a.length - 1]) + Math.abs(i[i.length - 2] - a[0]) + Math.abs(i[i.length - 1] - a[1])) ||
                                  n % 2)
                            ? (reverseSegment(a), (v[m] = -1), (y = !0))
                            : "auto" === n
                            ? (v[m] = 0)
                            : "reverse" === n && (v[m] = -1),
                        a.closed !== i.closed && (a.closed = i.closed = !1));
            return x && M("shapeIndex:[" + v.join(",") + "]"), (t.shapeIndex = v);
        }
    }
    function ea(t, e) {
        var n,
            r,
            o,
            i,
            a,
            h,
            s,
            l = 0,
            g = parseFloat(t[0]),
            c = parseFloat(t[1]),
            f = g + "," + c + " ";
        for (n = (0.5 * e) / (0.5 * (o = t.length) - 1), r = 0; r < o - 2; r += 2) {
            if (((l += n), (h = parseFloat(t[r + 2])), (s = parseFloat(t[r + 3])), 0.999999 < l))
                for (a = 1 / (Math.floor(l) + 1), i = 1; 0.999999 < l; ) (f += (g + (h - g) * a * i).toFixed(2) + "," + (c + (s - c) * a * i).toFixed(2) + " "), l--, i++;
            (f += h + "," + s + " "), (g = h), (c = s);
        }
        return f;
    }
    function fa(t) {
        var e = t[0].match(L) || [],
            n = t[1].match(L) || [],
            r = n.length - e.length;
        0 < r ? (t[0] = ea(e, r)) : (t[1] = ea(n, -r));
    }
    function ga(e) {
        return isNaN(e)
            ? fa
            : function (t) {
                  fa(t),
                      (t[1] = (function _offsetPoints(t, e) {
                          if (!e) return t;
                          var n,
                              r,
                              o,
                              i = t.match(L) || [],
                              a = i.length,
                              h = "";
                          for (n = "reverse" === e ? ((r = a - 1), -2) : ((r = (2 * (parseInt(e, 10) || 0) + 1 + 100 * a) % a), 2), o = 0; o < a; o += 2) (h += i[r - 1] + "," + i[r] + " "), (r = (r + n) % a);
                          return h;
                      })(t[1], parseInt(e, 10)));
              };
    }
    function ia(t, e) {
        for (var n, r, o, i, a, h, s, l, g, c, f, p, u = t.length, d = 0.2 * (e || 1); -1 < --u; ) {
            for (f = (r = t[u]).isSmooth = r.isSmooth || [0, 0, 0, 0], p = r.smoothData = r.smoothData || [0, 0, 0, 0], f.length = 4, l = r.length - 2, s = 6; s < l; s += 6)
                (o = r[s] - r[s - 2]),
                    (i = r[s + 1] - r[s - 1]),
                    (a = r[s + 2] - r[s]),
                    (h = r[s + 3] - r[s + 1]),
                    (g = v(i, o)),
                    (c = v(h, a)),
                    (n = Math.abs(g - c) < d) && ((p[s - 2] = g), (p[s + 2] = c), (p[s - 1] = w(o * o + i * i)), (p[s + 3] = w(a * a + h * h))),
                    f.push(n, n, 0, 0, n, n);
            r[l] === r[0] &&
                r[1 + l] === r[1] &&
                ((o = r[0] - r[l - 2]),
                (i = r[1] - r[l - 1]),
                (a = r[2] - r[0]),
                (h = r[3] - r[1]),
                (g = v(i, o)),
                (c = v(h, a)),
                Math.abs(g - c) < d && ((p[l - 2] = g), (p[2] = c), (p[l - 1] = w(o * o + i * i)), (p[3] = w(a * a + h * h)), (f[l - 2] = f[l - 1] = !0)));
        }
        return t;
    }
    function ja(t) {
        var e = t.trim().split(" ");
        return {
            x: (~t.indexOf("left") ? 0 : ~t.indexOf("right") ? 100 : isNaN(parseFloat(e[0])) ? 50 : parseFloat(e[0])) / 100,
            y: (~t.indexOf("top") ? 0 : ~t.indexOf("bottom") ? 100 : isNaN(parseFloat(e[1])) ? 50 : parseFloat(e[1])) / 100,
        };
    }
    function ma(t, e, n, r) {
        var o,
            i,
            a = this._origin,
            h = this._eOrigin,
            s = t[n] - a.x,
            l = t[n + 1] - a.y,
            g = w(s * s + l * l),
            c = v(l, s);
        return (
            (s = e[n] - h.x),
            (l = e[n + 1] - h.y),
            (i = (function _shortAngle(t) {
                return t !== t % f ? t + (t < 0 ? p : -p) : t;
            })((o = v(l, s) - c))),
            !r && F && Math.abs(i + F.ca) < u && (r = F),
            (this._anchorPT = F = { _next: this._anchorPT, t: t, sa: c, ca: r && i * r.ca < 0 && Math.abs(i) > d ? o : i, sl: g, cl: w(s * s + l * l) - g, i: n })
        );
    }
    function na(t) {
        (n = y()), (o = o || (n && n.plugins.morphSVG)), n && o ? ((j = n.utils.toArray), (o.prototype._tweenRotation = ma), (I = 1)) : t && M("Please gsap.registerPlugin(MorphSVGPlugin)");
    }
    var n,
        j,
        F,
        I,
        o,
        v = Math.atan2,
        x = Math.cos,
        O = Math.sin,
        w = Math.sqrt,
        f = Math.PI,
        p = 2 * f,
        u = 0.3 * f,
        d = 0.7 * f,
        L = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        G = /(^[#\.][a-z]|[a-y][a-z])/i,
        q = /[achlmqstvz]/i,
        i = "MorphSVGPlugin",
        a = P(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        H = (function (t) {
            for (
                   var n = [
                        a,
                        P(99, 111, 100, 101, 112, 101, 110, 46, 105, 111),
                        P(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103),
                        P(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118),
                        P(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112),
                        P(112, 101, 110, 115, 46, 99, 108, 111, 117, 100),
                        P(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109),
                        P(99, 100, 112, 110, 46, 105, 111),
                        P(112, 101, 110, 115, 46, 105, 111),
                        P(103, 97, 110, 110, 111, 110, 46, 116, 118),
                        P(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116),
                        P(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116),
                        P(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107),
                        P(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116),
                        P(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109),
                        P(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109),
                        P(112, 108, 110, 107, 114, 46, 99, 111),
                        P(104, 111, 116, 106, 97, 114, 46, 99, 111, 109),
                        P(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109),
                        P(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103),
                        P(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111),
                        P(99, 115, 98, 46, 97, 112, 112),
                        P(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109),
                        P(99, 111, 100, 105, 101, 114, 46, 105, 111),
                        P(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109),
                        P(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116),
                    ],
                    r = n.length;
                -1 < --r;

            )
                if (-1 !== t.indexOf(n[r])) return !0;
        }),
        B = "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",
        K = {
            version: "3.6.0",
            name: "morphSVG",
            rawVars: 1,
            register: function register(t, e) {
                (n = t), (o = e), na();
            },
            init: function init(t, e, n, r, o) {
                if ((I || na(1), !e)) return M("invalid shape"), !1;
                var i, a, h, s, l, g, c, f, p, u, d, P, _, w, m, v, y, x, T, b, S, N;
                if ((z(e) && (e = e.call(n, r, t, o)), "string" == typeof e || e.getBBox || e[0])) e = { shape: e };
                else if ("object" == typeof e) {
                    for (a in ((i = {}), e)) i[a] = z(e[a]) && "render" !== a ? e[a].call(n, r, t, o) : e[a];
                    e = i;
                }
                var A = t.nodeType ? window.getComputedStyle(t) : {},
                    R = A.fill + "",
                    O = !("none" === R || "0" === (R.match(L) || [])[3] || "evenodd" === A.fillRule),
                    C = (e.origin || "50 50").split(",");
                if (((l = "POLYLINE" === (i = (t.nodeName + "").toUpperCase()) || "POLYGON" === i), "PATH" !== i && !l && !e.prop)) return M("Cannot morph a <" + i + "> element. " + B), !1;
                if (((a = "PATH" === i ? "d" : "points"), !e.prop && !z(t.setAttribute))) return !1;
                if (
                    ((s = (function _parseShape(t, e, n) {
                        var r, o;
                        return (
                            (!("string" == typeof t) || G.test(t) || (t.match(L) || []).length < 3) &&
                                ((r = j(t)[0])
                                    ? ((o = (r.nodeName + "").toUpperCase()),
                                      e && "PATH" !== o && ((r = convertToPath(r, !1)), (o = "PATH")),
                                      (t = r.getAttribute("PATH" === o ? "d" : "points") || ""),
                                      r === n && (t = r.getAttributeNS(null, "data-original") || t))
                                    : (M("WARNING: invalid morph to: " + t), (t = !1))),
                            t
                        );
                    })(e.shape || e.d || e.points || "", "d" === a, t)),
                    l && q.test(s))
                )
                    return M("A <" + i + "> cannot accept path data. " + B), !1;
                if (
                    ((g = e.shapeIndex || 0 === e.shapeIndex ? e.shapeIndex : "auto"),
                    (c = e.map || K.defaultMap),
                    (this._prop = e.prop),
                    (this._render = e.render || K.defaultRender),
                    (this._apply = "updateTarget" in e ? e.updateTarget : K.defaultUpdateTarget),
                    (this._rnd = Math.pow(10, isNaN(e.precision) ? 2 : +e.precision)),
                    (this._tween = n),
                    s)
                ) {
                    if (
                        ((this._target = t),
                        (y = "object" == typeof e.precompile),
                        (u = this._prop ? t[this._prop] : t.getAttribute(a)),
                        this._prop || t.getAttributeNS(null, "data-original") || t.setAttributeNS(null, "data-original", u),
                        "d" === a || this._prop)
                    ) {
                        if (((u = stringToRawPath(y ? e.precompile[0] : u)), (d = stringToRawPath(y ? e.precompile[1] : s)), !y && !ba(u, d, g, c, O))) return !1;
                        for (
                            ("log" !== e.precompile && !0 !== e.precompile) || M('precompile:["' + rawPathToString(u) + '","' + rawPathToString(d) + '"]'),
                                (S = "linear" !== (e.type || K.defaultType)) &&
                                    ((u = ia(u, e.smoothTolerance)),
                                    (d = ia(d, e.smoothTolerance)),
                                    u.size || U(u),
                                    d.size || U(d),
                                    (b = ja(C[0])),
                                    (this._origin = u.origin = { x: u.left + b.x * u.width, y: u.top + b.y * u.height }),
                                    C[1] && (b = ja(C[1])),
                                    (this._eOrigin = { x: d.left + b.x * d.width, y: d.top + b.y * d.height })),
                                this._rawPath = t._gsRawPath = u,
                                _ = u.length;
                            -1 < --_;

                        )
                            for (m = u[_], v = d[_], f = m.isSmooth || [], p = v.isSmooth || [], w = m.length, P = F = 0; P < w; P += 2)
                                (v[P] === m[P] && v[P + 1] === m[P + 1]) ||
                                    (S
                                        ? f[P] && p[P]
                                            ? ((x = m.smoothData),
                                              (T = v.smoothData),
                                              (N = P + (P === w - 4 ? 7 - w : 5)),
                                              (this._controlPT = { _next: this._controlPT, i: P, j: _, l1s: x[P + 1], l1c: T[P + 1] - x[P + 1], l2s: x[N], l2c: T[N] - x[N] }),
                                              (h = this._tweenRotation(m, v, P + 2)),
                                              this._tweenRotation(m, v, P, h),
                                              this._tweenRotation(m, v, N - 1, h),
                                              (P += 4))
                                            : this._tweenRotation(m, v, P)
                                        : ((h = this.add(m, P, m[P], v[P])), (h = this.add(m, P + 1, m[P + 1], v[P + 1]) || h)));
                    } else h = this.add(t, "setAttribute", t.getAttribute(a) + "", s + "", r, o, 0, ga(g), a);
                    S && (this.add(this._origin, "x", this._origin.x, this._eOrigin.x), (h = this.add(this._origin, "y", this._origin.y, this._eOrigin.y))), h && (this._props.push("morphSVG"), (h.end = s), (h.endProp = a));
                }
                return H;
            },
            render: function render(t, e) {
                for (var n, r, o, i, a, h, s, l, g, c, f, p, u = e._rawPath, d = e._controlPT, P = e._anchorPT, _ = e._rnd, w = e._target, m = e._pt; m; ) m.r(t, m.d), (m = m._next);
                if (1 === t && e._apply) for (m = e._pt; m; ) m.end && (e._prop ? (w[e._prop] = m.end) : w.setAttribute(m.endProp, m.end)), (m = m._next);
                else if (u) {
                    for (; P; ) (a = P.sa + t * P.ca), (i = P.sl + t * P.cl), (P.t[P.i] = e._origin.x + x(a) * i), (P.t[P.i + 1] = e._origin.y + O(a) * i), (P = P._next);
                    for (r = t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1; d; )
                        (p = (h = d.i) + (h === (o = u[d.j]).length - 4 ? 7 - o.length : 5)),
                            (a = v(o[p] - o[h + 1], o[p - 1] - o[h])),
                            (c = O(a)),
                            (f = x(a)),
                            (l = o[h + 2]),
                            (g = o[h + 3]),
                            (i = d.l1s + r * d.l1c),
                            (o[h] = l - f * i),
                            (o[h + 1] = g - c * i),
                            (i = d.l2s + r * d.l2c),
                            (o[p - 1] = l + f * i),
                            (o[p] = g + c * i),
                            (d = d._next);
                    if (((w._gsRawPath = u), e._apply)) {
                        for (n = "", s = 0; s < u.length; s++) for (i = (o = u[s]).length, n += "M" + ((o[0] * _) | 0) / _ + " " + ((o[1] * _) | 0) / _ + " C", h = 2; h < i; h++) n += ((o[h] * _) | 0) / _ + " ";
                        e._prop ? (w[e._prop] = n) : w.setAttribute("d", n);
                    }
                }
                e._render && u && e._render.call(e._tween, u, w);
            },
            kill: function kill() {
                this._pt = this._rawPath = 0;
            },
            getRawPath: function getRawPath(t) {
                var e,
                    n = (t = (m(t) && r.test(t) && document.querySelector(t)) || t).getAttribute ? t : 0;
                return n && (t = t.getAttribute("d"))
                    ? (n._gsPath || (n._gsPath = {}), (e = n._gsPath[t]) && !e._dirty ? e : (n._gsPath[t] = stringToRawPath(t)))
                    : t
                    ? m(t)
                        ? stringToRawPath(t)
                        : h(t[0])
                        ? [t]
                        : t
                    : console.warn("Expecting a <path> element or an SVG path data string");
            },
            stringToRawPath: stringToRawPath,
            rawPathToString: rawPathToString,
            pathFilter: function _pathFilter(t, e, n, r, o) {
                var i = stringToRawPath(t[0]),
                    a = stringToRawPath(t[1]);
                ba(i, a, e || 0 === e ? e : "auto", n, o) && ((t[0] = rawPathToString(i)), (t[1] = rawPathToString(a)), ("log" !== r && !0 !== r) || M('precompile:["' + t[0] + '","' + t[1] + '"]'));
            },
            pointsFilter: fa,
            getTotalSize: U,
            equalizeSegmentQuantity: ba,
            convertToPath: function convertToPath$1(t, e) {
                return j(t).map(function (t) {
                    return convertToPath(t, !1 !== e);
                });
            },
            defaultType: "linear",
            defaultUpdateTarget: !0,
            defaultMap: "size",
        };
    y() && n.registerPlugin(K), (t.MorphSVGPlugin = K), (t.default = K);
    if (typeof window === "undefined" || window !== t) {
        Object.defineProperty(t, "__esModule", { value: !0 });
    } else {
        delete t.default;
    }
});
