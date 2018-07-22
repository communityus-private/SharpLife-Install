#version 450

layout(set = 0, binding = 0) uniform Projection
{
    mat4 _Proj;
};

layout(set = 0, binding = 1) uniform View
{
    mat4 _View;
};

layout(location = 0) in vec3 vsin_Position;
layout(location = 1) in vec3 vsin_Color;
layout(location = 0) out vec3 fsin_0;
layout(location = 1) out vec3 fsColor;

layout(constant_id = 102) const bool ReverseDepthRange = true;

void main()
{
    gl_Position = _Proj * _View * vec4(vsin_Position, 1.0f);
    fsin_0 = vsin_Position;
	fsColor = vsin_Color;
}
