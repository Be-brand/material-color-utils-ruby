declare module "utils/math_utils" {
    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Utility methods for mathematical operations.
     */
    /**
     * The signum function.
     *
     * @return 1 if num > 0, -1 if num < 0, and 0 if num = 0
     */
    export function signum(num: number): number;
    /**
     * The linear interpolation function.
     *
     * @return start if amount = 0 and stop if amount = 1
     */
    export function lerp(start: number, stop: number, amount: number): number;
    /**
     * Clamps an integer between two integers.
     *
     * @return input when min <= input <= max, and either min or max
     * otherwise.
     */
    export function clampInt(min: number, max: number, input: number): number;
    /**
     * Clamps an integer between two floating-point numbers.
     *
     * @return input when min <= input <= max, and either min or max
     * otherwise.
     */
    export function clampDouble(min: number, max: number, input: number): number;
    /**
     * Sanitizes a degree measure as an integer.
     *
     * @return a degree measure between 0 (inclusive) and 360
     * (exclusive).
     */
    export function sanitizeDegreesInt(degrees: number): number;
    /**
     * Sanitizes a degree measure as a floating-point number.
     *
     * @return a degree measure between 0.0 (inclusive) and 360.0
     * (exclusive).
     */
    export function sanitizeDegreesDouble(degrees: number): number;
    /**
     * Sign of direction change needed to travel from one angle to
     * another.
     *
     * For angles that are 180 degrees apart from each other, both
     * directions have the same travel distance, so either direction is
     * shortest. The value 1.0 is returned in this case.
     *
     * @param from The angle travel starts from, in degrees.
     * @param to The angle travel ends at, in degrees.
     * @return -1 if decreasing from leads to the shortest travel
     * distance, 1 if increasing from leads to the shortest travel
     * distance.
     */
    export function rotationDirection(from: number, to: number): number;
    /**
     * Distance of two points on a circle, represented using degrees.
     */
    export function differenceDegrees(a: number, b: number): number;
    /**
     * Multiplies a 1x3 row vector with a 3x3 matrix.
     */
    export function matrixMultiply(row: number[], matrix: number[][]): number[];
}
declare module "utils/color_utils" {
    /**
     * Converts a color from RGB components to ARGB format.
     */
    export function argbFromRgb(red: number, green: number, blue: number): number;
    /**
     * Converts a color from linear RGB components to ARGB format.
     */
    export function argbFromLinrgb(linrgb: number[]): number;
    /**
     * Returns the alpha component of a color in ARGB format.
     */
    export function alphaFromArgb(argb: number): number;
    /**
     * Returns the red component of a color in ARGB format.
     */
    export function redFromArgb(argb: number): number;
    /**
     * Returns the green component of a color in ARGB format.
     */
    export function greenFromArgb(argb: number): number;
    /**
     * Returns the blue component of a color in ARGB format.
     */
    export function blueFromArgb(argb: number): number;
    /**
     * Returns whether a color in ARGB format is opaque.
     */
    export function isOpaque(argb: number): boolean;
    /**
     * Converts a color from ARGB to XYZ.
     */
    export function argbFromXyz(x: number, y: number, z: number): number;
    /**
     * Converts a color from XYZ to ARGB.
     */
    export function xyzFromArgb(argb: number): number[];
    /**
     * Converts a color represented in Lab color space into an ARGB
     * integer.
     */
    export function argbFromLab(l: number, a: number, b: number): number;
    /**
     * Converts a color from ARGB representation to L*a*b*
     * representation.
     *
     * @param argb the ARGB representation of a color
     * @return a Lab object representing the color
     */
    export function labFromArgb(argb: number): number[];
    /**
     * Converts an L* value to an ARGB representation.
     *
     * @param lstar L* in L*a*b*
     * @return ARGB representation of grayscale color with lightness
     * matching L*
     */
    export function argbFromLstar(lstar: number): number;
    /**
     * Computes the L* value of a color in ARGB representation.
     *
     * @param argb ARGB representation of a color
     * @return L*, from L*a*b*, coordinate of the color
     */
    export function lstarFromArgb(argb: number): number;
    /**
     * Converts an L* value to a Y value.
     *
     * L* in L*a*b* and Y in XYZ measure the same quantity, luminance.
     *
     * L* measures perceptual luminance, a linear scale. Y in XYZ
     * measures relative luminance, a logarithmic scale.
     *
     * @param lstar L* in L*a*b*
     * @return Y in XYZ
     */
    export function yFromLstar(lstar: number): number;
    /**
     * Linearizes an RGB component.
     *
     * @param rgbComponent 0 <= rgb_component <= 255, represents R/G/B
     * channel
     * @return 0.0 <= output <= 100.0, color channel converted to
     * linear RGB space
     */
    export function linearized(rgbComponent: number): number;
    /**
     * Delinearizes an RGB component.
     *
     * @param rgbComponent 0.0 <= rgb_component <= 100.0, represents
     * linear R/G/B channel
     * @return 0 <= output <= 255, color channel converted to regular
     * RGB space
     */
    export function delinearized(rgbComponent: number): number;
    /**
     * Returns the standard white point; white on a sunny day.
     *
     * @return The white point
     */
    export function whitePointD65(): number[];
}
declare module "hct/viewing_conditions" {
    /**
     * In traditional color spaces, a color can be identified solely by the
     * observer's measurement of the color. Color appearance models such as CAM16
     * also use information about the environment where the color was
     * observed, known as the viewing conditions.
     *
     * For example, white under the traditional assumption of a midday sun white
     * point is accurately measured as a slightly chromatic blue by CAM16. (roughly,
     * hue 203, chroma 3, lightness 100)
     *
     * This class caches intermediate values of the CAM16 conversion process that
     * depend only on viewing conditions, enabling speed ups.
     */
    export class ViewingConditions {
        n: number;
        aw: number;
        nbb: number;
        ncb: number;
        c: number;
        nc: number;
        rgbD: number[];
        fl: number;
        fLRoot: number;
        z: number;
        /** sRGB-like viewing conditions.  */
        static DEFAULT: ViewingConditions;
        /**
         * Create ViewingConditions from a simple, physically relevant, set of
         * parameters.
         *
         * @param whitePoint White point, measured in the XYZ color space.
         *     default = D65, or sunny day afternoon
         * @param adaptingLuminance The luminance of the adapting field. Informally,
         *     how bright it is in the room where the color is viewed. Can be
         *     calculated from lux by multiplying lux by 0.0586. default = 11.72,
         *     or 200 lux.
         * @param backgroundLstar The lightness of the area surrounding the color.
         *     measured by L* in L*a*b*. default = 50.0
         * @param surround A general description of the lighting surrounding the
         *     color. 0 is pitch dark, like watching a movie in a theater. 1.0 is a
         *     dimly light room, like watching TV at home at night. 2.0 means there
         *     is no difference between the lighting on the color and around it.
         *     default = 2.0
         * @param discountingIlluminant Whether the eye accounts for the tint of the
         *     ambient lighting, such as knowing an apple is still red in green light.
         *     default = false, the eye does not perform this process on
         *       self-luminous objects like displays.
         */
        static make(whitePoint?: number[], adaptingLuminance?: number, backgroundLstar?: number, surround?: number, discountingIlluminant?: boolean): ViewingConditions;
        /**
         * Parameters are intermediate values of the CAM16 conversion process. Their
         * names are shorthand for technical color science terminology, this class
         * would not benefit from documenting them individually. A brief overview
         * is available in the CAM16 specification, and a complete overview requires
         * a color science textbook, such as Fairchild's Color Appearance Models.
         */
        private constructor();
    }
}
declare module "hct/cam16" {
    import { ViewingConditions } from "hct/viewing_conditions";
    /**
     * CAM16, a color appearance model. Colors are not just defined by their hex
     * code, but rather, a hex code and viewing conditions.
     *
     * CAM16 instances also have coordinates in the CAM16-UCS space, called J*, a*,
     * b*, or jstar, astar, bstar in code. CAM16-UCS is included in the CAM16
     * specification, and should be used when measuring distances between colors.
     *
     * In traditional color spaces, a color can be identified solely by the
     * observer's measurement of the color. Color appearance models such as CAM16
     * also use information about the environment where the color was
     * observed, known as the viewing conditions.
     *
     * For example, white under the traditional assumption of a midday sun white
     * point is accurately measured as a slightly chromatic blue by CAM16. (roughly,
     * hue 203, chroma 3, lightness 100)
     */
    export class Cam16 {
        readonly hue: number;
        readonly chroma: number;
        readonly j: number;
        readonly q: number;
        readonly m: number;
        readonly s: number;
        readonly jstar: number;
        readonly astar: number;
        readonly bstar: number;
        /**
         * All of the CAM16 dimensions can be calculated from 3 of the dimensions, in
         * the following combinations:
         *      -  {j or q} and {c, m, or s} and hue
         *      - jstar, astar, bstar
         * Prefer using a static method that constructs from 3 of those dimensions.
         * This constructor is intended for those methods to use to return all
         * possible dimensions.
         *
         * @param hue
         * @param chroma informally, colorfulness / color intensity. like saturation
         *     in HSL, except perceptually accurate.
         * @param j lightness
         * @param q brightness; ratio of lightness to white point's lightness
         * @param m colorfulness
         * @param s saturation; ratio of chroma to white point's chroma
         * @param jstar CAM16-UCS J coordinate
         * @param astar CAM16-UCS a coordinate
         * @param bstar CAM16-UCS b coordinate
         */
        constructor(hue: number, chroma: number, j: number, q: number, m: number, s: number, jstar: number, astar: number, bstar: number);
        /**
         * CAM16 instances also have coordinates in the CAM16-UCS space, called J*,
         * a*, b*, or jstar, astar, bstar in code. CAM16-UCS is included in the CAM16
         * specification, and is used to measure distances between colors.
         */
        distance(other: Cam16): number;
        /**
         * @param argb ARGB representation of a color.
         * @return CAM16 color, assuming the color was viewed in default viewing
         *     conditions.
         */
        static fromInt(argb: number): Cam16;
        /**
         * @param argb ARGB representation of a color.
         * @param viewingConditions Information about the environment where the color
         *     was observed.
         * @return CAM16 color.
         */
        static fromIntInViewingConditions(argb: number, viewingConditions: ViewingConditions): Cam16;
        /**
         * @param j CAM16 lightness
         * @param c CAM16 chroma
         * @param h CAM16 hue
         */
        static fromJch(j: number, c: number, h: number): Cam16;
        /**
         * @param j CAM16 lightness
         * @param c CAM16 chroma
         * @param h CAM16 hue
         * @param viewingConditions Information about the environment where the color
         *     was observed.
         */
        static fromJchInViewingConditions(j: number, c: number, h: number, viewingConditions: ViewingConditions): Cam16;
        /**
         * @param jstar CAM16-UCS lightness.
         * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
         *     coordinate on the Y axis.
         * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
         *     coordinate on the X axis.
         */
        static fromUcs(jstar: number, astar: number, bstar: number): Cam16;
        /**
         * @param jstar CAM16-UCS lightness.
         * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
         *     coordinate on the Y axis.
         * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
         *     coordinate on the X axis.
         * @param viewingConditions Information about the environment where the color
         *     was observed.
         */
        static fromUcsInViewingConditions(jstar: number, astar: number, bstar: number, viewingConditions: ViewingConditions): Cam16;
        /**
         *  @return ARGB representation of color, assuming the color was viewed in
         *     default viewing conditions, which are near-identical to the default
         *     viewing conditions for sRGB.
         */
        toInt(): number;
        /**
         * @param viewingConditions Information about the environment where the color
         *     will be viewed.
         * @return ARGB representation of color
         */
        viewed(viewingConditions: ViewingConditions): number;
    }
}
declare module "hct/hct_solver" {
    import { Cam16 } from "hct/cam16";
    /**
     * A class that solves the HCT equation.
     */
    export class HctSolver {
        static SCALED_DISCOUNT_FROM_LINRGB: number[][];
        static LINRGB_FROM_SCALED_DISCOUNT: number[][];
        static Y_FROM_LINRGB: number[];
        static CRITICAL_PLANES: number[];
        /**
         * Sanitizes a small enough angle in radians.
         *
         * @param angle An angle in radians; must not deviate too much
         * from 0.
         * @return A coterminal angle between 0 and 2pi.
         */
        private static sanitizeRadians;
        /**
         * Delinearizes an RGB component, returning a floating-point
         * number.
         *
         * @param rgbComponent 0.0 <= rgb_component <= 100.0, represents
         * linear R/G/B channel
         * @return 0.0 <= output <= 255.0, color channel converted to
         * regular RGB space
         */
        private static trueDelinearized;
        private static chromaticAdaptation;
        /**
         * Returns the hue of a linear RGB color in CAM16.
         *
         * @param linrgb The linear RGB coordinates of a color.
         * @return The hue of the color in CAM16, in radians.
         */
        private static hueOf;
        private static areInCyclicOrder;
        /**
         * Solves the lerp equation.
         *
         * @param source The starting number.
         * @param mid The number in the middle.
         * @param target The ending number.
         * @return A number t such that lerp(source, target, t) = mid.
         */
        private static intercept;
        private static lerpPoint;
        /**
         * Intersects a segment with a plane.
         *
         * @param source The coordinates of point A.
         * @param coordinate The R-, G-, or B-coordinate of the plane.
         * @param target The coordinates of point B.
         * @param axis The axis the plane is perpendicular with. (0: R, 1:
         * G, 2: B)
         * @return The intersection point of the segment AB with the plane
         * R=coordinate, G=coordinate, or B=coordinate
         */
        private static setCoordinate;
        private static isBounded;
        /**
         * Returns the nth possible vertex of the polygonal intersection.
         *
         * @param y The Y value of the plane.
         * @param n The zero-based index of the point. 0 <= n <= 11.
         * @return The nth possible vertex of the polygonal intersection
         * of the y plane and the RGB cube, in linear RGB coordinates, if
         * it exists. If this possible vertex lies outside of the cube,
         * [-1.0, -1.0, -1.0] is returned.
         */
        private static nthVertex;
        /**
         * Finds the segment containing the desired color.
         *
         * @param y The Y value of the color.
         * @param targetHue The hue of the color.
         * @return A list of two sets of linear RGB coordinates, each
         * corresponding to an endpoint of the segment containing the
         * desired color.
         */
        private static bisectToSegment;
        private static midpoint;
        private static criticalPlaneBelow;
        private static criticalPlaneAbove;
        /**
         * Finds a color with the given Y and hue on the boundary of the
         * cube.
         *
         * @param y The Y value of the color.
         * @param targetHue The hue of the color.
         * @return The desired color, in linear RGB coordinates.
         */
        private static bisectToLimit;
        private static inverseChromaticAdaptation;
        /**
         * Finds a color with the given hue, chroma, and Y.
         *
         * @param hueRadians The desired hue in radians.
         * @param chroma The desired chroma.
         * @param y The desired Y.
         * @return The desired color as a hexadecimal integer, if found; 0
         * otherwise.
         */
        private static findResultByJ;
        /**
         * Finds an sRGB color with the given hue, chroma, and L*, if
         * possible.
         *
         * @param hueDegrees The desired hue, in degrees.
         * @param chroma The desired chroma.
         * @param lstar The desired L*.
         * @return A hexadecimal representing the sRGB color. The color
         * has sufficiently close hue, chroma, and L* to the desired
         * values, if possible; otherwise, the hue and L* will be
         * sufficiently close, and chroma will be maximized.
         */
        static solveToInt(hueDegrees: number, chroma: number, lstar: number): number;
        /**
         * Finds an sRGB color with the given hue, chroma, and L*, if
         * possible.
         *
         * @param hueDegrees The desired hue, in degrees.
         * @param chroma The desired chroma.
         * @param lstar The desired L*.
         * @return An CAM16 object representing the sRGB color. The color
         * has sufficiently close hue, chroma, and L* to the desired
         * values, if possible; otherwise, the hue and L* will be
         * sufficiently close, and chroma will be maximized.
         */
        static solveToCam(hueDegrees: number, chroma: number, lstar: number): Cam16;
    }
}
declare module "hct/hct" {
    /**
     * HCT, hue, chroma, and tone. A color system that provides a perceptually
     * accurate color measurement system that can also accurately render what colors
     * will appear as in different lighting environments.
     */
    export class Hct {
        private argb;
        /**
         * @param hue 0 <= hue < 360; invalid values are corrected.
         * @param chroma 0 <= chroma < ?; Informally, colorfulness. The color
         *     returned may be lower than the requested chroma. Chroma has a different
         *     maximum for any given hue and tone.
         * @param tone 0 <= tone <= 100; invalid values are corrected.
         * @return HCT representation of a color in default viewing conditions.
         */
        internalHue: number;
        internalChroma: number;
        internalTone: number;
        static from(hue: number, chroma: number, tone: number): Hct;
        /**
         * @param argb ARGB representation of a color.
         * @return HCT representation of a color in default viewing conditions
         */
        static fromInt(argb: number): Hct;
        toInt(): number;
        /**
         * A number, in degrees, representing ex. red, orange, yellow, etc.
         * Ranges from 0 <= hue < 360.
         */
        get hue(): number;
        /**
         * @param newHue 0 <= newHue < 360; invalid values are corrected.
         * Chroma may decrease because chroma has a different maximum for any given
         * hue and tone.
         */
        set hue(newHue: number);
        get chroma(): number;
        /**
         * @param newChroma 0 <= newChroma < ?
         * Chroma may decrease because chroma has a different maximum for any given
         * hue and tone.
         */
        set chroma(newChroma: number);
        /** Lightness. Ranges from 0 to 100. */
        get tone(): number;
        /**
         * @param newTone 0 <= newTone <= 100; invalid valids are corrected.
         * Chroma may decrease because chroma has a different maximum for any given
         * hue and tone.
         */
        set tone(newTone: number);
        private constructor();
        private setInternalState;
    }
}
declare module "blend/blend" {
    /**
     * Functions for blending in HCT and CAM16.
     */
    export class Blend {
        /**
         * Blend the design color's HCT hue towards the key color's HCT
         * hue, in a way that leaves the original color recognizable and
         * recognizably shifted towards the key color.
         *
         * @param designColor ARGB representation of an arbitrary color.
         * @param sourceColor ARGB representation of the main theme color.
         * @return The design color with a hue shifted towards the
         * system's color, a slightly warmer/cooler variant of the design
         * color's hue.
         */
        static harmonize(designColor: number, sourceColor: number): number;
        /**
         * Blends hue from one color into another. The chroma and tone of
         * the original color are maintained.
         *
         * @param from ARGB representation of color
         * @param to ARGB representation of color
         * @param amount how much blending to perform; 0.0 >= and <= 1.0
         * @return from, with a hue blended towards to. Chroma and tone
         * are constant.
         */
        static hctHue(from: number, to: number, amount: number): number;
        /**
         * Blend in CAM16-UCS space.
         *
         * @param from ARGB representation of color
         * @param to ARGB representation of color
         * @param amount how much blending to perform; 0.0 >= and <= 1.0
         * @return from, blended towards to. Hue, chroma, and tone will
         * change.
         */
        static cam16Ucs(from: number, to: number, amount: number): number;
    }
}
declare module "palettes/tonal_palette" {
    /**
     *  A convenience class for retrieving colors that are constant in hue and
     *  chroma, but vary in tone.
     */
    export class TonalPalette {
        private readonly hue;
        private readonly chroma;
        private readonly cache;
        /**
         * @param argb ARGB representation of a color
         * @return Tones matching that color's hue and chroma.
         */
        static fromInt(argb: number): TonalPalette;
        /**
         * @param hue HCT hue
         * @param chroma HCT chroma
         * @return Tones matching hue and chroma.
         */
        static fromHueAndChroma(hue: number, chroma: number): TonalPalette;
        private constructor();
        /**
         * @param tone HCT tone, measured from 0 to 100.
         * @return ARGB representation of a color with that tone.
         */
        tone(tone: number): number;
    }
}
declare module "palettes/core_palette" {
    import { TonalPalette } from "palettes/tonal_palette";
    /**
     * An intermediate concept between the key color for a UI theme, and a full
     * color scheme. 5 sets of tones are generated, all except one use the same hue
     * as the key color, and all vary in chroma.
     */
    export class CorePalette {
        a1: TonalPalette;
        a2: TonalPalette;
        a3: TonalPalette;
        n1: TonalPalette;
        n2: TonalPalette;
        error: TonalPalette;
        /**
         * @param argb ARGB representation of a color
         */
        static of(argb: number): CorePalette;
        /**
         * @param argb ARGB representation of a color
         */
        static contentOf(argb: number): CorePalette;
        private constructor();
    }
}
declare module "scheme/scheme" {
    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    import { CorePalette } from "palettes/core_palette";
    /**
     * Represents a Material color scheme, a mapping of color roles to colors.
     */
    export class Scheme {
        private readonly props;
        get primary(): number;
        get onPrimary(): number;
        get primaryContainer(): number;
        get onPrimaryContainer(): number;
        get secondary(): number;
        get onSecondary(): number;
        get secondaryContainer(): number;
        get onSecondaryContainer(): number;
        get tertiary(): number;
        get onTertiary(): number;
        get tertiaryContainer(): number;
        get onTertiaryContainer(): number;
        get error(): number;
        get onError(): number;
        get errorContainer(): number;
        get onErrorContainer(): number;
        get background(): number;
        get onBackground(): number;
        get surface(): number;
        get onSurface(): number;
        get surfaceVariant(): number;
        get onSurfaceVariant(): number;
        get outline(): number;
        get shadow(): number;
        get inverseSurface(): number;
        get inverseOnSurface(): number;
        get inversePrimary(): number;
        /**
         * @param argb ARGB representation of a color.
         * @return Light Material color scheme, based on the color's hue.
         */
        static light(argb: number): Scheme;
        /**
         * @param argb ARGB representation of a color.
         * @return Dark Material color scheme, based on the color's hue.
         */
        static dark(argb: number): Scheme;
        /**
         * @param argb ARGB representation of a color.
         * @return Light Material content color scheme, based on the color's hue.
         */
        static lightContent(argb: number): Scheme;
        /**
         * @param argb ARGB representation of a color.
         * @return Dark Material content color scheme, based on the color's hue.
         */
        static darkContent(argb: number): Scheme;
        /**
         * Light scheme from core palette
         */
        static lightFromCorePalette(core: CorePalette): Scheme;
        /**
         * Dark scheme from core palette
         */
        static darkFromCorePalette(core: CorePalette): Scheme;
        private constructor();
        toJSON(): {
            primary: number;
            onPrimary: number;
            primaryContainer: number;
            onPrimaryContainer: number;
            secondary: number;
            onSecondary: number;
            secondaryContainer: number;
            onSecondaryContainer: number;
            tertiary: number;
            onTertiary: number;
            tertiaryContainer: number;
            onTertiaryContainer: number;
            error: number;
            onError: number;
            errorContainer: number;
            onErrorContainer: number;
            background: number;
            onBackground: number;
            surface: number;
            onSurface: number;
            surfaceVariant: number;
            onSurfaceVariant: number;
            outline: number;
            shadow: number;
            inverseSurface: number;
            inverseOnSurface: number;
            inversePrimary: number;
        };
    }
}
declare module "scheme/scheme_android" {
    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    import { CorePalette } from "palettes/core_palette";
    /**
     * Represents an Android 12 color scheme, a mapping of color roles to colors.
     */
    export class SchemeAndroid {
        private readonly props;
        get colorAccentPrimary(): number;
        get colorAccentPrimaryVariant(): number;
        get colorAccentSecondary(): number;
        get colorAccentSecondaryVariant(): number;
        get colorAccentTertiary(): number;
        get colorAccentTertiaryVariant(): number;
        get textColorPrimary(): number;
        get textColorSecondary(): number;
        get textColorTertiary(): number;
        get textColorPrimaryInverse(): number;
        get textColorSecondaryInverse(): number;
        get textColorTertiaryInverse(): number;
        get colorBackground(): number;
        get colorBackgroundFloating(): number;
        get colorSurface(): number;
        get colorSurfaceVariant(): number;
        get colorSurfaceHighlight(): number;
        get surfaceHeader(): number;
        get underSurface(): number;
        get offState(): number;
        get accentSurface(): number;
        get textPrimaryOnAccent(): number;
        get textSecondaryOnAccent(): number;
        get volumeBackground(): number;
        get scrim(): number;
        /**
         * @param argb ARGB representation of a color.
         * @return Light Material color scheme, based on the color's hue.
         */
        static light(argb: number): SchemeAndroid;
        /**
         * @param argb ARGB representation of a color.
         * @return Dark Material color scheme, based on the color's hue.
         */
        static dark(argb: number): SchemeAndroid;
        /**
         * @param argb ARGB representation of a color.
         * @return Light Android color scheme, based on the color's hue.
         */
        static lightContent(argb: number): SchemeAndroid;
        /**
         * @param argb ARGB representation of a color.
         * @return Dark Android color scheme, based on the color's hue.
         */
        static darkContent(argb: number): SchemeAndroid;
        /**
         * Light scheme from core palette
         */
        static lightFromCorePalette(core: CorePalette): SchemeAndroid;
        /**
         * Dark scheme from core palette
         */
        static darkFromCorePalette(core: CorePalette): SchemeAndroid;
        private constructor();
        toJSON(): {
            colorAccentPrimary: number;
            colorAccentPrimaryVariant: number;
            colorAccentSecondary: number;
            colorAccentSecondaryVariant: number;
            colorAccentTertiary: number;
            colorAccentTertiaryVariant: number;
            textColorPrimary: number;
            textColorSecondary: number;
            textColorTertiary: number;
            textColorPrimaryInverse: number;
            textColorSecondaryInverse: number;
            textColorTertiaryInverse: number;
            colorBackground: number;
            colorBackgroundFloating: number;
            colorSurface: number;
            colorSurfaceVariant: number;
            colorSurfaceHighlight: number;
            surfaceHeader: number;
            underSurface: number;
            offState: number;
            accentSurface: number;
            textPrimaryOnAccent: number;
            textSecondaryOnAccent: number;
            volumeBackground: number;
            scrim: number;
        };
    }
}
declare module "score/score" {
    /**
     *  Given a large set of colors, remove colors that are unsuitable for a UI
     *  theme, and rank the rest based on suitability.
     *
     *  Enables use of a high cluster count for image quantization, thus ensuring
     *  colors aren't muddied, while curating the high cluster count to a much
     *  smaller number of appropriate choices.
     */
    export class Score {
        private static readonly TARGET_CHROMA;
        private static readonly WEIGHT_PROPORTION;
        private static readonly WEIGHT_CHROMA_ABOVE;
        private static readonly WEIGHT_CHROMA_BELOW;
        private static readonly CUTOFF_CHROMA;
        private static readonly CUTOFF_TONE;
        private static readonly CUTOFF_EXCITED_PROPORTION;
        private constructor();
        /**
         * Given a map with keys of colors and values of how often the color appears,
         * rank the colors based on suitability for being used for a UI theme.
         *
         * @param colorsToPopulation map with keys of colors and values of how often
         *     the color appears, usually from a source image.
         * @return Colors sorted by suitability for a UI theme. The most suitable
         *     color is the first item, the least suitable is the last. There will
         *     always be at least one color returned. If all the input colors
         *     were not suitable for a theme, a default fallback color will be
         *     provided, Google Blue.
         */
        static score(colorsToPopulation: Map<number, number>, contentColor?: boolean): number[];
        private static filter;
        private static filterContent;
    }
}
declare module "utils/string_utils" {
    /**
     * Utility methods for hexadecimal representations of colors.
     */
    /**
     * @param argb ARGB representation of a color.
     * @return Hex string representing color, ex. #ff0000 for red.
     */
    export const hexFromArgb: (argb: number) => string;
    /**
     * @param hex String representing color as hex code. Accepts strings with or
     *     without leading #, and string representing the color using 3, 6, or 8
     *     hex characters.
     * @return ARGB representation of color.
     */
    export const argbFromHex: (hex: string) => number;
}
declare module "utils/theme_utils" {
    import { TonalPalette } from "palettes/tonal_palette";
    import { Scheme } from "scheme/scheme";
    /**
     * Custom color used to pair with a theme
     */
    export interface CustomColor {
        value: number;
        name: string;
        blend: boolean;
    }
    /**
     * Color group
     */
    export interface ColorGroup {
        color: number;
        onColor: number;
        colorContainer: number;
        onColorContainer: number;
    }
    /**
     * Custom Color Group
     */
    export interface CustomColorGroup {
        color: CustomColor;
        value: number;
        light: ColorGroup;
        dark: ColorGroup;
    }
    /**
     * Theme
     */
    export interface Theme {
        source: number;
        schemes: {
            light: Scheme;
            dark: Scheme;
        };
        palettes: {
            primary: TonalPalette;
            secondary: TonalPalette;
            tertiary: TonalPalette;
            neutral: TonalPalette;
            neutralVariant: TonalPalette;
            error: TonalPalette;
        };
        customColors: CustomColorGroup[];
    }
    /**
     * Generate a theme from a source color
     *
     * @param source Source color
     * @param customColors Array of custom colors
     * @return Theme object
     */
    export function themeFromSourceColor(source: number, customColors?: CustomColor[]): Theme;
    /**
     * Generate custom color group from source and target color
     *
     * @param source Source color
     * @param color Custom color
     * @return Custom color group
     *
     * @link https://m3.material.io/styles/color/the-color-system/color-roles
     */
    export function customColor(source: number, color: CustomColor): CustomColorGroup;
    /**
     * Apply a theme to an element
     *
     * @param theme Theme object
     * @param options Options
     */
    export function applyTheme(theme: Theme, options?: {
        dark?: boolean;
        target?: HTMLElement;
        brightnessSuffix?: boolean;
        paletteTones?: number[];
    }): void;
}
declare module "index" {
    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    export * from "blend/blend";
    export * from "hct/cam16";
    export * from "hct/hct";
    export * from "hct/viewing_conditions";
    export * from "palettes/core_palette";
    export * from "palettes/tonal_palette";
    export * from "scheme/scheme";
    export * from "scheme/scheme_android";
    export * from "score/score";
    export * from "utils/color_utils";
    export * from "utils/math_utils";
    export * from "utils/string_utils";
    export * from "utils/theme_utils";
}
