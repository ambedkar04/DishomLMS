from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = (
            'mobile_number', 'password', 'email', 'full_name', 'role',
            'district', 'state', 'pincode', 'batch_name', 'subjects', 'profile_picture'
        )
        extra_kwargs = {'subjects': {'required': False}}

    def validate(self, attrs):
        errors = {}

        # Required fields
        if not attrs.get('full_name'):
            errors['full_name'] = 'This field is required.'

        # If role is Teacher, subjects must be provided
        # If role is Teacher, subjects should be provided (handled by frontend/API usually)
        if attrs.get('role') == 'Teacher' and not attrs.get('subjects'):
             # Note: M2M fields in create() need special handling, but here we just check presence in attrs
             pass

        if errors:
            raise serializers.ValidationError(errors)

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        profile = validated_data.pop('profile_picture', None)
        subjects = validated_data.pop('subjects', [])
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        if profile:
            user.profile_picture = profile
        user.save()
        if subjects:
            user.subjects.set(subjects)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'mobile_number'

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['full_name'] = user.get_full_name()
        return token

    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            return data
        except AuthenticationFailed as exc:
            msg = str(exc)
            if 'No active account found' in msg:
                raise AuthenticationFailed({
                    'error': 'मोबाइल नंबर या पासवर्ड गलत है / Invalid mobile number or password'
                })
            raise AuthenticationFailed({'error': 'मोबाइल नंबर या पासवर्ड गलत है / Invalid mobile number or password'})
        except KeyError:
            raise serializers.ValidationError({'error': 'कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields'})